const questions = [
  {
    question: " 1<br> 오늘은 월요일입니다. 내일은 화요일입니다.",
    options: { a: "날짜", b: "휴일", c: "요일", d: "장소" },
    answer: "c",
    explanation: "Review Not aviable."
  },
  {
    question: " 2<br>사과가 맛있습니다. 바나나도 맛있습니다. ",
    options: { a: "과일", b: "날씨", c: "직업", d: "나이" },
    answer: "a",
    explanation: "Review Not aviable."
  },
  {
    question: " 3<br>다음 단어와 관계있는 것을 무엇입니까 ?<br> <br> 배 , 버스 , 자동차 , 지하철 <br> <br> ",
    options: { a: " 신다 ", b: " 타다 ", c: " 버리다 ", d: " 건너다 " },
    answer: "b",
    explanation: "Review Not aviable."
  },
  {
    question: " 4<br>다음 단어의 반대말을 고르십시오.<br> <br> 짧다<br> <br> ",
    options: { a: " 멀다 ", b: " 많다 ", c: " 길다 ", d: " 적다 " },
    answer: "c",
    explanation: "Review Not aviable."
  },
  {
    question: "5<br> ",
    options: { a: "", b: "", c: "", d: "" },
    answer: "c",
    explanation: "",
    image: "rxasset/QSM3/img/"
  },
  {
    question: " 6<br>가게에 갑니다. 모자를 삽니다.",
    options: { a: "공부", b: "이름", c: "물건", d: "쇼핑" },
    answer: "d",
    explanation: "Review Not aviable."
  },
  {
    question: " 7<br>7월에는 수업이 없습니다. 학교에 안 갑니다. ",
    options: { a: "위치", b: "방학", c: "여행", d: "계절" },
    answer: "b",
    explanation: "Review Not aviable."
  },
  {
    question: " 8<br>비가 옵니다.----을 씁니다.",
    options: { a: "안경", b: "양말", c: "우산", d: "지갑" },
    answer: "c",
    explanation: "Review Not aviable."
  },
  {
    question: " 9<br>영화를-----. 정말 재미있습니다.",
    options: { a: "봅니다", b: "잡니다", c: "보냅니다", d: "마십니다" },
    answer: "a",
    explanation: "Review Not aviable."
  },{
    question: "10<br> ",
    options: { a: "", b: "", c: "", d: "" },
    answer: "c",
    explanation: "",
    image: "rxasset/QSM3/img/"
  },
  {
    question: " 11<br>한국 가수를 좋아합니다. 매일 한국 ------를 듣습니다. ",
    options: { a: "편지", b: "전화", c: "시계", d: "노래" },
    answer: "d",
    explanation: "Review Not aviable."
  },
  
  {
    question: " 12<br>저는 선생님입니다. 학교에서 학생들을 ----. ",
    options: { a: "읽습니다", b: "물어봅니다", c: "가르칩니다", d: "입습니다" },
    answer: "c",
    explanation: "Review Not aviable."
  },
  {
    question: " 13<br>저는 요즘 ----. 시간이 없습니다.",
    options: { a: "바쁩니다", b: "작습니다", c: "무겁습니다", d: "조용합니다" },
    answer: "a",
    explanation: "Review Not aviable."
  },
  {
    question: " 14<br>저는 김민수 씨를 모릅니다. 내일---- 만납니다.",
    options: { a: "항상", b: "제일", c: "보통", d: "처음" },
    answer: "d",
    explanation: "Review Not aviable."
  },
  {
    question: "15<br> ",
    options: { a: "", b: "", c: "", d: "" },
    answer: "c",
    explanation: "",
    image: "rxasset/QSM3/img/"
  },
  {
    question: " 16<br>저는 볼펜이 없습니다. 연필----있습니다. ",
    options: { a: "을", b: "만", c: "도", d: "다리" },
    answer: "b",
    explanation: "Review Not aviable."
  },
  {
    question: " 17<br>저는 요리를 잘 못합니다. 그래서 음식을 보통 사 먹습니다. 오늘 저녁은 집 근처 식당에서 불고기를 먹을 겁니다",
    options: { a: "저는 요리를 자주 합니다.", b: "집 근처에 식당이 없습니다.", c: "저는 오늘 불고기를 먹을 겁니다.", d: "저는 오늘 집에서 저녁을 먹습니다." },
    answer: "c",
    explanation: "Review Not aviable."
  },
  {
    question: " 18<br>어제 친구가 한국에 왔습니다. 오늘 우리 집에 놀러 올 겁니다. 저는 집을 깨끗하게 청소했습니다. ",
    options: { a: "친구하고 집을 청소할 겁니다.", b: "친구가 오늘 한국에 왔습니다.", c: "저는 친구 집에 갈 겁니다.", d: "저는 오늘 친구를 만납니다." },
    answer: "d",
    explanation: "Review Not aviable."
  },
  {
    question: " 19<br>저는 보통 버스를 탑니다. ----- 지하철을 탑니다.",
    options: { a: "항상", b: "아주", c: "빨리", d: "가끔" },
    answer: "d",
    explanation: "Review Not aviable."
  },
  {
    question: "20<br> ",
    options: { a: "", b: "", c: "", d: "" },
    answer: "c",
    explanation: "",
    image: "rxasset/QSM3/img/"
  },
  {
    question: "21<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "당신의 여동생이 이름은 뭐 입니까 ?", b: " 단신의 여동생 있어요 ?", c: "제 여동생 열다섯 살 입니다.", d: "오늘 여동생랑 시장 갑니다." },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio1.mp3"
  },
  {
    question: "22<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "이 지갑의 다섯 원 입니다 .", b: "이 양말 오백 원 입니다 .", c: "이 모자 오백 원 입니다 .", d: "이 지갑의 오백 원 입니다 ." },
    answer: "d",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio2.mp3"
  },
  {
    question: "23<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "이 가방은 소의 입니다.", b: "이 가방 제는 입니다.", c: "이 소 제는 입니다.", d: "이 가방 없어요." },
    answer: "b",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio3.mp3"
  },
  {
    question: "24<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "제  이름은 깨 시 로선 입니다 .", b: "제 남동생 이름은 깨 시 로선 입니다 .", c: "제 친구 이름은 깨 시 로선 입니다 .", d: "제 아버지 이름은 깨 시 로선 입니다 ." },
    answer: "c",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio4.mp3"
  },
  {
    question: "25<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "당신이 음식을 요리해요.", b: "저는 뭐 해요 ?", c: "당신 어디 갑니까 ?", d: "아이구 ,뭐 일어나요 ." },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio5.mp3"
  },
  {
    question: "26<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "당신을 물소 고기를 먹고 좋아요 ?", b: "당신을 고기를 먹고 좋아요 ?", c: "저는 고기를 먹고 싶어요.", d: "이 고기는 뭣은 입니까 ?" },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio6.mp3"
  },
  {
    question: "27<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "당신은 집에 갑니까 ?", b: "당신에 이름은 뭐 입니까 ?", c: "어디 갑니까 ?", d: "당신의 집 어디로 있습니까 ?" },
    answer: "d",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio7.mp3"
  },
  {
    question: "28<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "내일 갑니다.", b: "당신이 오늘 뭣은 먹습니까 ?", c: "식당에 먹습나다.", d: "닥 고기를 먹습니다." },
    answer: "b",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio8.mp3"
  },
  {
    question: "29<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "물소 입니까 ?", b: "비행기 입니다.", c: "제 친구 입니다 .", d: "소 입니다." },
    answer: "c",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio9.mp3"
  },
  {
    question: "30<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "아이구 이 사람은 않이 바배 있어요 .", b: "아이구 이 사람은 않이 소 있어요 .", c: "아이구 이 사람은 바배 있어요 .", d: "아이구  사람은 않이  있어요 ." },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio10.mp3"
  },
  {
    question: "31<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "그 사람은 누구 밉니까 ?", b: "남동생 입니다.", c: "여동생 입니다 .", d: "당신의 남동생 있습니까 ?" },
    answer: "d",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio11.mp3"
  },
  {
    question: "32<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "집에 가.", b: "저는 뭣은 해요 ?", c: "빨리 하라.", d: "뭐 입니까 ?" },
    answer: "b",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio12.mp3"
  },
  {
    question: "33<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "뭐 해요 ?", b: "왜 가요 ?", c: "당신 뭣은 싶어요 ?", d: "집에 갑니까 ?" },
    answer: "c",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio13.mp3"
  },
  {
    question: "34<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "깨 시 로선 입니다 .", b: "친구 입니다.", c: "학생 입니다 .", d: "선생님 입니다." },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio14.mp3"
  },
  {
    question: "35<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "내일 비가 와을거예요.", b: "저는 싶어요.", c: " 여자 많이 예쁘어요.", d: "날시 많이 좋아요." },
    answer: "d",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio15.mp3"
  },
  {
    question: "36<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "아녕하세요 .", b: "안녕하세요 , 저는 집에 갑니다 .", c: "몰라요 .", d: "어디 갑니까 ?" },
    answer: "b",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio16.mp3"
  },
  {
    question: "37<br> 듣고 가장 알맞은 것을 고르십시오.",
    options: { a: "안녕하세요", b: "감사합니다", c: "네", d: "안녕하십니까" },
    answer: "a",
    explanation: "Review not Aviable.",
    audio: "rxasset/QSM2/audio/audio17.mp3"
  },
  {
    question: " 38<br>가：더 드세요.<br>나：많이 먹었어요. _________이/가 불러서 더 먹을 수 없어요. ",
    options: { a: "눈", b: "발", c: "입", d: "배" },
    answer: "d",
    explanation: "Review Not aviable."
  },
  {
    question: " 39<br>가：이 약은 언제 먹는 거예요?<br>나：하루 세 ____ 드세요. 아침, 점심, 저녁 식사 후에 드시면 됩니다. ",
    options: { a: "명", b: "번", c: " 장", d: "대" },
    answer: "b",
    explanation: "Review Not aviable."
  },
  {
    question: " 40<br>가：지수 씨는 술을 잘 마셔요?<br>나：맥주 한 _____쯤은 마실 수 있어요. ",
    options: { a: "마리", b: "대", c: "병", d: " 장" },
    answer: "c",
    explanation: "Review Not aviable."
  },
];