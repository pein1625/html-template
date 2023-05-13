async function submitSurvey() {
  return {
    id: 1,
    image: "./images/modal-card-1.png",
    name: "Kết quả 1",
    title: "Xin chúc mừng<br>Bạn phù hợp với thẻ BIDV Napas Smart",
    description: "Vui lòng ấn nút bên dưới để xem thêm thông tin chi tiết",
    url: "https://rangdong.com.vn",
  };
}

async function getPuzzleData() {
  return {
    id: 1,
    name: 'Hình Ghép 1',
    piece_jigsaw: [
      './images/cell-3.png',
      './images/cell-4.png',
      './images/cell-5.png',
      './images/cell-6.png',
      './images/cell-7.png',
      './images/cell-8.png',
      './images/cell-9.png',
      './images/cell-10.png',
      './images/cell-11.png',
    ],
    result: './images/modal-card-1.png',
  }
}

function checkLoggedIn() {
  return true;
}

function getQuizQuestions() {
  return [
    {
      question: 'Thẻ BIDV Visa Infinite được hoàn tiền tới bao nhiêu % tại lĩnh vực Golf/Spa/Resort nước ngoài?',
      options: {
        'A': '6%',
        'B': '5%',
        'C': '7%',
        'D': '8%',
      },
      answer: 'A',
    },
    {
      question: 'Ai là người đầu tiên đặt chân lên mặt trăng?',
      options: {
        'A': 'Mark Zuckerberg',
        'B': 'Bill Gates',
        'C': 'Neil Amstrong',
        'D': 'Lady Gaga',
      },
      answer: 'C',
    },
    {
      question: 'Có một tàu điện đi về hướng nam. Gió hướng tây bắc. Vậy khói từ con tàu sẽ theo hướng nào?',
      options: {
        'A': 'Đông',
        'B': 'Tây',
        'C': 'Bắc',
        'D': 'Không hướng nào',
      },
      answer: 'D',
    },
    {
      question: 'Từ gì mà 100% người Việt Nam đều phát âm sai?',
      options: {
        'A': 'Nai',
        'B': 'Bye',
        'C': 'Sai',
        'D': 'Lai',
      },
      answer: 'C',
    },
    {
      question: 'Loại nước giải khát nào chứa Canxi và Sắt?',
      options: {
        'A': 'Coca',
        'B': 'Pepsi',
        'C': 'Cafe',
        'D': 'Sinh tố',
      },
      answer: 'C',
    },
    {
      question: 'Một anh thanh niên đánh 1 bà già hỏi anh ấy mất gì?',
      options: {
        'A': 'Mất tiền',
        'B': 'Mất trí',
        'C': 'Mất sức',
        'D': 'Mất dạy',
      },
      answer: 'D',
    },
    {
      question: 'Có 1 đàn chuột điếc đi ngang qua hố cống, hỏi có mấy con?',
      options: {
        'A': '12',
        'B': '16',
        'C': '20',
        'D': '24',
      },
      answer: 'D',
    },
    {
      question: 'Cái gì mà đi thì nằm, đứng cũng nằm, nhưng nằm lại đứng?',
      options: {
        'A': 'Cái bàn',
        'B': 'Cái ghế',
        'C': 'Bàn chân',
        'D': 'Bàn là',
      },
      answer: 'C',
    },
    {
      question: 'Có bao nhiêu chữ C trong câu sau: "Cơm, canh, cá, tất cả em đều thích"?',
      options: {
        'A': '1',
        'B': '2',
        'C': '3',
        'D': '4',
      },
      answer: 'A',
    },
  ];
}
