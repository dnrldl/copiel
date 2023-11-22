const selectStage1 = [
  {
    category: '기초 문법, 변수',
    question: '파이썬은 <b>어떤 언어</b> 일까요?',
    hint: '초보자가 배우기 쉬운 프로그래밍언어에요',
    correct_answer: '간단하지만 효과적인 객체지향 언어',
    incorrect_answers: [
      '한국에서 만들어진 언어',
      '일부 전문가만 사용하도록 만들어진 언어',
      '하드웨어 언어',
    ],
  },
  {
    category: '기초 문법, 변수',
    question: '파이썬에서 한줄 주석은 무엇 일까요?',
    hint: '음표에도 사용되요',
    correct_answer: '#',
    incorrect_answers: ['*', '/', '//'],
  },
];

const selectStage2 = [
  {
    category: '문자열',
    question:
      'letters가 바인딩하는 문자열에서 첫번째와 세번째 문자를 출력하세요</br> >>letters="python"  실행 예: p t',
    hint: '파이썬 인덱싱은 0부터 시작하고,[]를 사용하여 나타내요!',
    correct_answer: 'print(python[0],python[2]',
    incorrect_answers: [
      'print(python[3],python[0]',
      'print(python[1],python[2]',
      'print(python[2],python[0]',
    ],
  },
  {
    category: '문자열',
    question:
      '자동차 번호가 다음과 같을 때 뒤에 4자리만 출력하세요. \\n license_plate ="24가 2210"',
    hint: 'sequence[start:stop:step]은 문자열이나 리스트 등의 시퀀스 자료형에서 \\n 일부를 추출하는 방법이에요!',
    correct_answer: 'print(license_plate[4:])      ',
    incorrect_answers: [
      'print(license_plate[4:1])',
      'print(license_plate[0:4])',
      'print(license_plate[1:4])',
    ],
  },
  {
    category: '문자열',
    question: '문자열을 거꾸로 뒤집어 출력하세요.\\n string = "PYTHON" ',
    hint: '[::-1]은 문자열 전체를 거꾸로 뒤집는 슬라이스에요!',
    correct_answer: 'print(string[::-1])',
    incorrect_answers: [
      'print(string[-1::])',
      'print(string[-6] + string[-5] + string[-4] + string[-3] + string[-2] + string[-1])',
      'print(string[::0])',
    ],
  },
  {
    category: '문자열',
    question:
      "아래 문자열에서 소문자'a'를 대문자 'A'로 변경하세요.\\n >>string=\"ad2a34ar3\" \\n 실행 예:Ad2A34Ar3",
    hint: '변경을 영어로 하면돼요!',
    correct_answer: "string.replace('a','A')",
    incorrect_answers: [
      "string.return('a','A')",
      "string.substitute('a','A')",
      "string.input('A')",
    ],
  },
  {
    category: '문자열',
    question: '아래 코드의 실행 결과를 예상해보세요\\n print("Hi" *3)',
    hint: 'Hi를곱한것 만큼 나타내면 돼요!',
    correct_answer: 'HiHiHi',
    incorrect_answers: ['HiH', 'HHHiii', 'iHiHiH'],
  },
  {
    category: '문자열',
    question: '문자열에서 문자열을 분리할 때 사용하는 메소드는?',
    hint: '분리하다를 영어로 하면돼요!.',
    correct_answer: 'split메소드',
    incorrect_answers: ['endswith메소드', 'upper메소드', 'capitalize메소드'],
  },
  {
    category: '문자열',
    question: '문자열을 가운데 정렬한 것으로 알맞은 메소드는 무엇일까요?',
    hint: '중심을 영어로 변경해봐요!',
    correct_answer: 'center()',
    incorrect_answers: ['left()', 'top()', 'bottom'],
  },
  {
    category: '문자열',
    question:
      'count()함수는 문자열 안에서 입력한 문자가 나타나는 횟수를 반환하는 함수입니다. \\n 아래 코드를 보고 문자가 나타나는 횟수를 선택하세요 \\n a="banana" \\n print(a.count("a"))',
    hint: 'count는 숫자를 세는 개념이에요! ',
    correct_answer: '3',
    incorrect_answers: ['2', '1', '6'],
  },
  {
    category: '문자열',
    question: '파이썬에서 문자열을 합치는 함수는 무엇일까요?',
    hint: 'join함수는 리스트의 문자열들을 합치는 역할을 해요!',
    correct_answer: 'join',
    incorrect_answers: ['sum', 'mix', 'combine'],
  },
  {
    category: '문자열',
    question:
      '아래 주어진 코드의 결과는 무엇일까요? \\n t1="python"\\n t2="java"\\t3=t1+t2\\n print(t3)',
    hint: '문자열을 합치면돼요!',
    correct_answer: 'pythonjava',
    incorrect_answers: ['javapython', 'pjyatvhaon', 'JavaPython'],
  },
];
const inputStage1 = [
  {
    category: '기초 문법, 변수',
    question: '파이썬은 어떤 언어 일까요?',
    hint: '초보자가 배우기 쉬운 프로그래밍언어에요',
    correct_answer: 'a',
  },
  {
    category: '기초 문법, 변수',
    question: '파이썬에서 한줄 주석은 무엇 일까요?',
    hint: '음표에도 사용되요',
    correct_answer: 'b',
  },
];
