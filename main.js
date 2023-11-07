const questions = [
    {
      questionTitle: "ماهي عاصمه السعوديه؟",
      options: ["الرياض", "جدة", "القصيم", "الكويت"],
      keyAnswer: "الرياض",
    },
    {
      questionTitle: "افضل نادي فالعالم",
      options: ["الاهلي", "النصر", "الهلال", "التعاون"],
      keyAnswer: "الهلال",
    },
    {
      questionTitle: "ماهو افضل لون",
      options: ["احمر", "اصفر", "ازرق", "وردي"],
      keyAnswer: "وردي",
    },
    {
      questionTitle: "ماهو ناتج ضرب 5*13",
      options: ["70", "60", "65", "55"],
      keyAnswer: "65",
    },
  ];

  let questions2 = [
    {
        questionTitle: "لغه برمجه؟ html هل ",
        options: "",
        keyAnswer: "اللي تبي",
      },
      {
        questionTitle: "اين تقع السعوديه",
        options: "",
        keyAnswer: "السعوديه لن تقع",
      },
  ]
  
  const qustionsCont = document.getElementById("qustions-cont");
  const qustionsText = document.getElementById("qustions-text");
  const options = document.getElementById("options");
  const timeLeft = document.getElementById("time-left");
  const resultCont = document.getElementById("result-cont");
  const resultText = document.getElementById("result-text");
  
  let currentIndex = 0;
  let score = 0;
  let timer = 10;
  let countDown;
  
  function showQuestion(index) {
    const questin = questions[index];
    qustionsText.innerText = questin.questionTitle;
    options.innerHTML = "";
    questin.options.forEach((option) => {
      const b = document.createElement("button");
      b.textContent = option;
      options.appendChild(b);
  
      b.addEventListener("click", () => {
        checkAnswer(option, questin.keyAnswer);
      });
      // options.insertAdjacentHTML("afterbegin", `<button>${option}</button>`);
    });
  }

  function showInputQuestion(index) {
    const question = questions2[index];
    qustionsText.innerText = question.questionTitle;
    options.innerHTML = "";
  
    let input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "userAnswer");
    options.appendChild(input);
  
    input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        let userAnswer = document.getElementById("userAnswer").value;
        checkAnswer(userAnswer, question.keyAnswer);
      }
    });
  }
  
  function showTimer() {
    countDown = setInterval(function () {
      timer--;
      timeLeft.textContent = timer;
      if (timer <= 0) {
        clearInterval(countDown);
        checkAnswer("", null);
      }
    }, 1000);
  }
  
  showQuestion(currentIndex);
  showTimer();
  
  function checkAnswer(userAnswer, correctAnswer) {
    currentIndex++;
    clearInterval(countDown);
  
    if (userAnswer === correctAnswer) {
      score++;
    }
  
    if (currentIndex < questions.length) {
      showQuestion(currentIndex);
      timer = 10;
      timeLeft.textContent = timer;
      showTimer();
    } else if (currentIndex < questions.length + questions2.length) {
      showInputQuestion(currentIndex - questions.length);
      timer = 10;
      timeLeft.textContent = timer;
      showTimer();
    } else {
      showResult();
    }
  }
  
  function showResult() {
    qustionsCont.style.display = "none";
    resultCont.style.display = "flex";
    resultText.textContent = `Your Score is ${score} of ${questions.length + questions2.length}`;
  }