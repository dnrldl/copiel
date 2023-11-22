const datas = [
  {
    category: '기초 문법, 변수',
    question: '파이썬은 어떤 언어 일까요?',
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
  {
    category: '기초 문법, 변수',
    question:
      'print( )을 사용하여 화면에 Hello world를 출력할때 괄호안에 들어갈 단어는 무엇 일까요? ',
    hint: 'double quotation marks',
    correct_answer: '"Hello world"',
    incorrect_answers: ['Hello world', '(hello world)', '({"Hello world"})'],
  },
  {
    category: '기초 문법, 변수',
    question: 'print(5*2)는 무엇일까요?',
    hint: '사칙연산',
    correct_answer: '10',
    incorrect_answers: ['3', '2', '7'],
  },
  {
    category: '기초 문법, 변수',
    question: '다음 중 변수명으로 사용하기에 올바르지 않은 것은 무엇 일까요?',
    hint: '특수 문자는 언더바(_)만 허용해요, 숫자로시작하면 안돼요',
    correct_answer: '2mydata',
    incorrect_answers: ['mydata2', 'my_data2', '_2mydata'],
  },
  {
    category: '기초 문법, 변수',
    question:
      '프로그램에서 사용되는 데이터를 저장해 놓는 일종의 저장공간은 무엇 일까요?',
    hint: '수학에서 쓰이는 수식에 따라서 변하는 값',
    correct_answer: '변수',
    incorrect_answers: ['실수', '상수', '자료형'],
  },
  {
    category: '기초 문법, 변수',
    question: '파이썬에서 사용되는 세가지 기본 데이터 타입이 아닌 것은?',
    hint: 'str,int,float,boolearn',
    correct_answer: '비숫자형 타입',
    incorrect_answers: ['문자열 타입', '숫자형 타입', '불리언 타입'],
  },
  {
    category: '기초 문법, 변수',
    question:
      '출력값을 보고 i와 j의 알맞은 숫자를 고르시오? print(i+j)=8, print(i-j)=4',
    hint: '대입해봐',
    correct_answer: 'i=6,j=2',
    incorrect_answers: ['i=5,j=3', 'i=4,j=4', 'i=1,j=7'],
  },
  {
    category: '기초 문법, 변수',
    question:
      'string1 = "안녕" string2 = "2" print(string1+string2)에 실행결과는?',
    hint: '대입해봐',
    correct_answer: '안녕2',
    incorrect_answers: ['안녕안녕', '안녕', '22'],
  },
  {
    category: '기초 문법, 변수',
    question:
      'py="우리집 강아지 이름은 멍멍이 입니다"라는 문장에서 \'강\' 문자를 출력하는 출력문은 무엇인가요?',
    hint: 'py = "파이썬으로 코딩" py[0]=파, py[1]=이, py[2]=썬',
    correct_answer: 'print(py[4])',
    incorrect_answers: ['print(py[5:6])', 'print(py[:4])', 'print(py[7:])'],
  },
];
