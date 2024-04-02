let questF = document.querySelector(".question")
let ansB = document.querySelectorAll(".answer")

function randint(min, max){
    return Math.round(Math.random() * (max - min) + min)
}

let signs = ["+", "-", "*", "/"]

function grs(){
    return signs[randint(0, 3)]
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
    array[randomIndex], array[currentIndex]];
  }
  return array;
}

class Question{
    constructor(){
        let a = randint(1, 30)
        let b = randint(1, 30)
        let sign = grs()
        this.question = `${a} ${sign} ${b}`
        if (sign == "+"){
            this.correct = Math.round(a + b)
        } else if (sign == "-"){
            this.correct = Math.round(a - b)
        } else if (sign == "*"){
            this.correct = Math.round(a * b)
        } else if (sign == "/"){
            this.correct = Math.round(a / b)
        }
        this.answers = [
            randint(this.correct - 15, this.correct - 1),
            randint(this.correct - 15, this.correct - 1),
            randint(this.correct + 15, this.correct + 1),
            randint(this.correct + 15, this.correct + 1),
            this.correct
        ]
        shuffle(this.answers)
     
    }
    display(){
        questF.innerHTML = this.question
        for (let i = 0; i < this.answers.length; i += 1){
            ansB[i].innerHTML = this.answers[i]
        }
    }
}

let ct = 0
let cf = 0

let cq = new Question()
cq.display()

for (let i = 0; i < ansB.length; i += 1){
    ansB[i].addEventListener("click", function(){
        if (ansB[i].innerHTML == cq.correct){
            ansB[i].style.background = "#32CD32"
            anime({
                targets: ansB[i],
                background: "#2b95ff",
                duration: 500,
                easing: "linear",
            })
            ct += 1
        } else {
            ansB[i].style.background = "#DC143C"
            anime({
                targets: ansB[i],
                background: "#2b95ff",
                duration: 500,
                easing: "linear",
            })
            cf += 1
        }
        cq = new Question()
        cq.display()
    })
}

const modal = document.querySelector('.backdrop');
const modalBtnOpen = document.querySelector('.modal-bth-open');

const modalBtnClose = document.querySelector('.modal-bth-close');

const toggleModal = () => modal.classList.toggle('is-hidden');

modalBtnOpen.addEventListener('click', toggleModal);
modalBtnClose.addEventListener('click', toggleModal);


let st = document.querySelector(".show_static1")
let sft = document.querySelector(".sft")
let sff = document.querySelector(".sff")
st.addEventListener("click", function(){
    sft.innerHTML = "Правельных ответов: " + ct
    sff.innerHTML = "Неправельных ответов: " + cf
})
