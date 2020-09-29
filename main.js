const content = [
  {
    question: 'What is the IP code of NTU ?',
    options: [
      '110', '111', '112', '113'
    ],
    ans: 2
  },
  {
    question: 'How old is NTU ?',
    options: [
      '91 years old', '92 years old', '93 years old', '94 years old'
    ],
    ans: 1
  },
  {
    question: 'Which of the following is not an operating system ?',
    options: [
      'Firefox', 'Windows', 'MacOS', 'Linux'
    ],
    ans: 0
  }
];

let q_box = document.getElementById('question-box');
let q_title = document.getElementById('question-title');
let options = document.getElementById('options');
let actions = document.getElementById('actions');
let current_question = -1;
let score = 0;

let q_box_inner = document.createElement('div')
q_box_inner.setAttribute('class', 'question-box-inner')
q_box.appendChild(q_box_inner)

const next = () => {
  // previous question part
  if (current_question !== -1) {
    let opt = document.getElementsByName(`q${current_question + 1}option`);
    for (let j = 0; j < opt.length; j++) {
      if (opt[j].checked) {
        if (j === content[current_question].ans) {
          score += 1;
        }
        break;
      }
    }
    
    for (let k = options.childNodes.length-1; k > -1; k--) {
      options.removeChild(options.childNodes[k]);
    }
  }

  // show ans part
  if (current_question == 2) {
    actions.removeAttribute('onclick');
    actions.style.visibility = 'hidden';
    q_title.innerHTML = `Your Score : ${score} / ${content.length}`;
  }

  // new question part
  if (current_question < 2) {
    current_question += 1;
    q_box_inner.innerHTML = `Question ${current_question + 1} of ${content.length}`;
    q_title.innerHTML = content[current_question].question;

    for (let i = 0; i < content[current_question].options.length; i++) {
      let each_option = document.createElement('div');
      each_option.setAttribute('class', 'each-option');
      each_option.setAttribute('onclick', `choose(${i})`);

      let option_radio = document.createElement('input');
      option_radio.setAttribute('type', 'radio');
      option_radio.setAttribute('name', `q${current_question + 1}option`);
      option_radio.setAttribute('id', `q${current_question + 1}_${i}`);
      option_radio.setAttribute('value', content[current_question].options[i]);

      let option_text = document.createElement('span');
      option_text.innerHTML = content[current_question].options[i];

      each_option.appendChild(option_radio);
      each_option.appendChild(option_text);
      options.appendChild(each_option);
    }
  }
}

const choose = (i) => {
  document.getElementById(`q${current_question + 1}_${i}`).checked = true;
}

const initialize = () => {
  actions.setAttribute('onclick', 'next()');
  actions.innerHTML = 'NEXT';
  next();
}

initialize();
