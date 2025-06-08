 // Global variables
    let currentQrSize = 200;
    let currentQrColor = '#000000';
    
    // DOM Ready
    document.addEventListener('DOMContentLoaded', function() {
      // Set up file input change listener
      document.getElementById('qrFileInput').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
          document.getElementById('fileName').textContent = file.name;
          document.getElementById('fileInfo').classList.remove('hidden');
        }
      });
      
      // Set up QR color picker
      document.getElementById('qrColor').addEventListener('input', function(e) {
        currentQrColor = e.target.value;
      });
    });
    
    function switchTab(tab) {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.card').forEach(c => c.classList.add('hidden'));
      document.getElementById(tab).classList.remove('hidden');
      event.target.classList.add('active');
      
      // Reset results when switching tabs
      if (tab === 'generate') {
        resetGenerateTab();
      } else if (tab === 'read') {
        resetReadTab();
      }
    }
    
    function resetGenerateTab() {
      document.getElementById('qrCanvas').classList.add('hidden');
      document.getElementById('qrSuccess').classList.add('hidden');
      document.getElementById('downloadSection').classList.add('hidden');
      document.getElementById('encryptedOutputContainer').classList.add('hidden');
    }
    
    function resetReadTab() {
      document.getElementById('resultContainer').classList.add('hidden');
    }
    
    function setQrSize(size) {
      currentQrSize = size;
      document.querySelectorAll('.qr-size-btn').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
    }
    
    function togglePassword(inputId, icon) {
      const input = document.getElementById(inputId);
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    }
    
    function encryptAndGenerateQR() {
      const msg = document.getElementById("messageInput").value.trim();
      const pass = document.getElementById("encryptPassword").value;
      const canvas = document.getElementById("qrCanvas");
      const output = document.getElementById("encryptedOutput");
      const downloadBtn = document.getElementById("downloadBtn");
      const encryptedOutputContainer = document.getElementById("encryptedOutputContainer");
      const qrSuccess = document.getElementById("qrSuccess");
      const downloadSection = document.getElementById("downloadSection");

      if (!msg) {
        showAlert("Please enter a message to encrypt.", "error");
        return;
      }
      
      if (!pass || pass.length < 6) {
        showAlert("Please enter a password with at least 6 characters.", "error");
        return;
      }

      try {
        // Encrypt with AES-256
        const encrypted = CryptoJS.AES.encrypt(msg, pass).toString();
        
        // Generate QR code with custom color
        QRCode.toCanvas(canvas, encrypted, {
          width: currentQrSize,
          color: {
            dark: currentQrColor,
            light: '#ffffff'
          },
          margin: 2
        }, function(err) {
          if (err) {
            showAlert("Error generating QR code. Please try again.", "error");
            console.error(err);
          } else {
            canvas.classList.remove("hidden");
            qrSuccess.classList.remove("hidden");
            downloadSection.classList.remove("hidden");
            encryptedOutputContainer.classList.remove("hidden");
            
            output.textContent = encrypted;
            
            // Prepare download
            const dataURL = canvas.toDataURL("image/png");
            downloadBtn.href = dataURL;
            
            // Scroll to results
            canvas.scrollIntoView({ behavior: 'smooth' });
          }
        });
      } catch (error) {
        showAlert("Encryption failed. Please try again.", "error");
        console.error(error);
      }
    }
    
    function scanAndDecrypt() {
      const fileInput = document.getElementById("qrFileInput");
      const pass = document.getElementById("decryptPassword").value;
      const output = document.getElementById("result");
      const resultContainer = document.getElementById("resultContainer");

      if (!fileInput.files[0]) {
        showAlert("Please upload a QR code image first.", "error");
        return;
      }

      if (!pass) {
        showAlert("Please enter the decryption password.", "error");
        return;
      }

      const reader = new FileReader();
      reader.onload = function() {
        const img = new Image();
        img.onload = function() {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          
          try {
            const code = jsQR(imageData.data, canvas.width, canvas.height);
            
            if (code) {
              try {
                const bytes = CryptoJS.AES.decrypt(code.data, pass);
                const originalText = bytes.toString(CryptoJS.enc.Utf8);
                
                if (originalText) {
                  output.textContent = originalText;
                  resultContainer.classList.remove("hidden");
                  resultContainer.classList.add("success");
                  resultContainer.querySelector('.result-title i').className = 'fas fa-check-circle';
                  resultContainer.querySelector('.result-title').innerHTML = `<i class="fas fa-check-circle"></i> Message Decrypted Successfully`;
                  
                  // Scroll to result
                  resultContainer.scrollIntoView({ behavior: 'smooth' });
                } else {
                  showAlert("Wrong password or invalid QR code.", "error");
                }
              } catch (e) {
                showAlert("Decryption failed. Please check the password.", "error");
                console.error(e);
              }
            } else {
              showAlert("No QR code found in the image.", "error");
            }
          } catch (error) {
            showAlert("Error processing QR code. Please try another image.", "error");
            console.error(error);
          }
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(fileInput.files[0]);
    }
    
    function copyToClipboard(elementId) {
      const element = document.getElementById(elementId);
      const text = element.textContent || element.innerText;
      
      navigator.clipboard.writeText(text).then(function() {
        showAlert("Copied to clipboard!", "success");
      }).catch(function(err) {
        console.error('Could not copy text: ', err);
        showAlert("Failed to copy text", "error");
      });
    }
    
    function showAlert(message, type) {
      const alertDiv = document.createElement('div');
      alertDiv.className = `alert-${type}`;
      alertDiv.style.position = 'fixed';
      alertDiv.style.bottom = '20px';
      alertDiv.style.right = '20px';
      alertDiv.style.padding = '12px 24px';
      alertDiv.style.borderRadius = '8px';
      alertDiv.style.color = 'white';
      alertDiv.style.fontWeight = '500';
      alertDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      alertDiv.style.zIndex = '1000';
      alertDiv.style.animation = 'fadeIn 0.3s ease-in-out';
      
      if (type === 'success') {
        alertDiv.style.backgroundColor = '#10b981';
      } else if (type === 'error') {
        alertDiv.style.backgroundColor = '#ef4444';
      } else {
        alertDiv.style.backgroundColor = '#3b82f6';
      }
      
      alertDiv.textContent = message;
      document.body.appendChild(alertDiv);
      
      setTimeout(function() {
        alertDiv.style.animation = 'fadeOut 0.3s ease-in-out';
        setTimeout(function() {
          document.body.removeChild(alertDiv);
        }, 300);
      }, 3000);
    }
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(20px); }
      }
    `;
    document.head.appendChild(style);