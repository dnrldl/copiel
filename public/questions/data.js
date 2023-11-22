const selectStage1 = [
  {
    category: '기초 문법',
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
    category: '기초 문법',
    question: '파이썬에서 한줄 <b>주석</b>은 무엇 일까요?',
    hint: '음표에도 사용되요',
    correct_answer: '#',
    incorrect_answers: ['*', '/', '//'],
  },
  {
    category: '기초 문법',
    question:
      'print( )을 사용하여 화면에 <b>Hello world</b>를 출력할때</br> 괄호안에 들어갈 단어는 무엇 일까요? ',
    hint: 'double quotation marks',
    correct_answer: '"Hello world"',
    incorrect_answers: ['Hello world', '(hello world)', '({"Hello world"})'],
  },
  {
    category: '기초 문법',
    question: '<b>print(5*2)</b>는 무엇일까요?',
    hint: '사칙연산',
    correct_answer: '10',
    incorrect_answers: ['3', '2', '7'],
  },
  {
    category: '기초 문법',
    question:
      '다음 중 <b>변수명</b>으로 사용하기에 올바르지</br> 않은 것은 무엇 일까요?',
    hint: '특수 문자는 언더바(_)만 허용해요, 숫자로시작하면 안돼요',
    correct_answer: '2mydata',
    incorrect_answers: ['mydata2', 'my_data2', '_2mydata'],
  },
  {
    category: '기초 문법',
    question:
      '프로그램에서 사용되는 데이터를 저장해 놓는<br> 일종의 <b>저장공간</b>은 무엇 일까요?',
    hint: '수학에서 쓰이는 수식에 따라서 변하는 값',
    correct_answer: '변수',
    incorrect_answers: ['실수', '상수', '자료형'],
  },
  {
    category: '기초 문법',
    question:
      '파이썬에서 사용되는 세가지 기본 </br><b>데이터 타입</b>이 아닌 것은?',
    hint: 'str,int,float,boolearn',
    correct_answer: '비숫자형 타입',
    incorrect_answers: ['문자열 타입', '숫자형 타입', '불리언 타입'],
  },
  {
    category: '기초 문법',
    question:
      '출력값을 보고 i와 j의 알맞은 숫자를 고르시오? <b>print(i+j)=8, print(i-j)=4</b>',
    hint: '대입해봐요',
    correct_answer: 'i=6,j=2',
    incorrect_answers: ['i=5,j=3', 'i=4,j=4', 'i=1,j=7'],
  },
  {
    category: '기초 문법',
    question:
      '<b>string1 = "안녕" string2 = "2"</br> print(string1+string2)</b>에 실행결과는?',
    hint: '대입해봐요',
    correct_answer: '안녕2',
    incorrect_answers: ['안녕안녕', '안녕', '22'],
  },
  {
    category: '기초 문법',
    question:
      'result 변수에 최종적으로 저장되는 값은 무엇일까요?</br><b>number1=100, number2=200 </br>result=number1+300</b>',
    hint: '대입해봐요',
    correct_answer: '400',
    incorrect_answers: ['300', '100', '500'],
  },
];

const selectStage2 = [
  {
    category: '문자열',
    question:
      '문자열은( )들을 이용하여 하나의 문자열로 묶을수있는데 <b>괄호</b>안에 들어가지 못하는 것은 무엇일까요?',
    hint: '짝수에요',
    correct_answer: '큰따옴표4개',
    incorrect_answers: ['작은따옴표', '큰따옴표3개', '작은따옴표3개'],
  },
  {
    category: '문자열',
    question:
      '변수에 문자열을 대입하는 코드이다</br> <b>오류</b>가 발생되는 것은 무엇일까요?',
    hint: '짝수에요',
    correct_answer: 'str1 = ""난생처음""',
    incorrect_answers: [
      "str1 = '난생처음'",
      "str1 = '''난생처음'''",
      'str1 = "난생처음"',
    ],
  },
  {
    category: '문자열',
    question:
      '문자열 안에서 줄을 바꿀 때 사용하는</br> <b>이스케이프 코드</b>는 무엇일까요?',
    hint: 'C언어에서도 사용돼요',
    correct_answer: '\\n',
    incorrect_answers: ['\\t', '\\\\', '\\"'],
  },
  {
    category: '문자열',
    question: "<b>S='Do python'</b>에서 <b>print(S[4])</b>는 무엇일까요? ",
    hint: 'S의 4번째 문자열이에요',
    correct_answer: 'y',
    incorrect_answers: ['D', "' '", 'o'],
  },
  {
    category: '기초 문법',
    question:
      '<b>py="우리집 강아지 이름은 멍멍이 입니다"</b>라는 문장에서 <b>\'강\'</b> 문자를 출력하는 출력문은 무엇인가요?',
    hint: 'py = "파이썬으로 코딩" py[0]=파, py[1]=이, py[2]=썬',
    correct_answer: 'print(py[4])',
    incorrect_answers: ['print(py[5:6])', 'print(py[:4])', 'print(py[7:])'],
  },

  {
    category: '문자열',
    question:
      '<b>a = "python" b = "fun"</b> 일때 <b>print(b+a)</b>는 무엇일까요?',
    hint: '문자열을 정수처럼 더하거나 곱할 수있어요',
    correct_answer: 'funpython',
    incorrect_answers: ['pythonfun', 'funfun', 'funpythonfun'],
  },
  {
    category: '문자열',
    question:
      '문자열의 연산이다 정상적으로 실행되는</br> 코드는 무엇일까요? <b>str1="동서울" str="대학교"</b>',
    hint: '문자열을 정수처럼 더하거나 곱할 수있어요',
    correct_answer: 'print(str1 + str2)',
    incorrect_answers: [
      'print(str1 / str2)',
      'print(str1 * str2)',
      'print(str1 - str2)',
    ],
  },
  {
    category: '문자열',
    question: '<b>문자열 함수</b>의 설명으로 잘못된 것은 무엇일까요?',
    hint: '소문자를 대문자로 변경',
    correct_answer: 'upper() : 왼쪽 공백 지우기',
    incorrect_answers: [
      'len() : 문자열의 길이를 확인',
      'count() : 어떤 글자가 몇 번 나왔는지 확인',
      'find() : 어떤 글자가 몇 번째 위치하는지 확인',
    ],
  },
  {
    category: '문자열',
    question: '<b>문자열의 길이</b>를 알려주는 함수는 무엇일까요?',
    hint: '길이',
    correct_answer: 'len()',
    incorrect_answers: ['size()', 'input()', 'output()'],
  },
  {
    category: '문자열',
    question:
      '<b>문자열을 가운데 정렬</b>한 것으로 알맞은</br> 메소드는 무엇일까요?',
    hint: '가운데',
    correct_answer: 'center()',
    incorrect_answers: ['left()', 'top()', 'bottom()'],
  },
];
const selectStage3 = [
  {
    category: '배열',
    question:
      '5개의 값 <b>100,300,500,700,900</b>을 저장하는</br> 리스트를 정의하는 구문은 무엇일까요?',
    hint: '배열도 사용해요',
    correct_answer: 'myList = [100,300,500,700,900]',
    incorrect_answers: [
      'myList = {100,300,500,700,900}',
      'myList = <100,300,500,700,900>',
      'myList = (100,300,500,700,900)',
    ],
  },
  {
    category: '배열',
    question:
      '코드의 실행결과는 무엇일까요?</br> <b>myList=[100,200,300,400] </br>print(myList[2]), print(myList[-1])</b>',
    hint: '인덱스',
    correct_answer: '300,400',
    incorrect_answers: ['200,400', '200,100', '300,100'],
  },
  {
    category: '배열',
    question:
      '코드의 실행결과는 무엇일까요?</br> <b>myList=[1,2,3,4,5,6,7,8,9,10] </br>print(myList[::2])</b>',
    hint: '슬라이싱,홀짝',
    correct_answer: '1,3,5,7,9',
    incorrect_answers: ['2,4,6,8,10', '1,3,5', '2,6,10'],
  },
  {
    category: '배열',
    question:
      '코드의 실행결과는 무엇일까요?</br> <b>list=[1,2,3,4] t=tuple(list)</br> print(t)</b>',
    hint: 'parenthesis',
    correct_answer: '(1,2,3,4)',
    incorrect_answers: ['{1,2,3,4}', '[1,2,3,4]', '<1,2,3,4>'],
  },
  {
    category: '배열',
    question:
      '<b>딕셔너리</b>에서 <b>키</b>만 고르는 함수와 <b>값</b>만 고르는 함수를</br> 차례대로 나열한 것은 무엇일까요? ',
    hint: '모든 키,모든 값',
    correct_answer: 'keys(),values()',
    incorrect_answers: ['key(),value()', 'value(),key()', 'values(),keys()'],
  },
  {
    category: '배열',
    question: 'temp 이름의 비어있는 <b>딕셔너리</b>를 만든것은?',
    hint: 'braces',
    correct_answer: 'temp = {}',
    incorrect_answers: ['temp = ()', 'temp = <>', 'temp = []'],
  },
  {
    category: '배열',
    question: '리스트와 튜플 중에서 <b>중복된 값을 허용하지 않는 자료형</b>은?',
    hint: 'xbvmf',
    correct_answer: '튜플',
    incorrect_answers: ['리스트', '둘 다', '둘 다 아님'],
  },
  {
    category: '배열',
    question:
      '<b>딕셔너리</b>에 <b>해당 키</b>가 있는지 검사하는 함수는 무엇일까요?',
    hint: '안',
    correct_answer: 'in',
    incorrect_answers: ['on', 'items()', 'get()'],
  },
  {
    category: '배열',
    question: '<b>키</b> 값에 올 수 없는 것은 무엇일까요?',
    hint: '키값은 불변한 객체타입이 와야해요',
    correct_answer: 'list',
    incorrect_answers: ['int', 'tuple', 'str'],
  },
  {
    category: '배열',
    question: '<b>딕셔너리</b>에서 <b>키,값</b> 한쌍 지우기는 무엇일까요?',
    hint: '삭제',
    correct_answer: 'del',
    incorrect_answers: ['clear()', 'get()', 'items()'],
  },
];

const selectStage4 = [
  {
    category: '분기문',
    question: '다음 중 파이썬에서 사용되는 주요 <b>분기문 키워드</b>는?',
    hint: '만약',
    correct_answer: 'if',
    incorrect_answers: ['loop', 'for', 'function'],
  },
  {
    category: '분기문',
    question: '다음 중 <b>비교 연산자</b>가 아닌 것은?',
    hint: '비교가 아닌것',
    correct_answer: 'and',
    incorrect_answers: ['<=', '!=', '=='],
  },
  {
    category: '분기문',
    question:
      'if 문에서 <b>여러 조건을 동시에 검사</b>하려면</br> 어떤 키워드를 사용해야 하는가?',
    hint: '~와',
    correct_answer: 'and',
    incorrect_answers: ['or', 'xor', 'not'],
  },
  {
    category: '분기문',
    question:
      '다음 중 if 문에서 <b>조건이 거짓</b>일 경우</br> 실행되는 블록을 나타내는 키워드는?',
    hint: 'if하면 바로 나오는것',
    correct_answer: 'else',
    incorrect_answers: ['unless', 'other', 'otherwise'],
  },
  {
    category: '분기문',
    question:
      'if 문에서 <b>여러 조건을 순차적으로 검사</b>할 때</br> 사용하는 키워드는?',
    hint: 'if-?-else',
    correct_answer: 'elif',
    incorrect_answers: ['else if', 'then', 'case'],
  },
  {
    category: '분기문',
    question:
      '다음 중 if-elif-else 문에서 <b>여러 조건 중 하나에</br> 해당하는 경우</b> 실행되는 블록은 몇 개인가?',
    hint: '5*2-7',
    correct_answer: '3개',
    incorrect_answers: ['2개', '1개', '4개'],
  },
  {
    category: '분기문',
    question:
      'if문에서 조건이 참일 때 <b>아무것도 실행하지 않게</b></br> 하려면 어떤 키워드를 사용해야 하는가?',
    hint: '축구용어',
    correct_answer: 'pass',
    incorrect_answers: ['break', 'continue', 'skip'],
  },
  {
    category: '분기문',
    question:
      'elif 키워드를 <b>사용하지 않고</b> 여러 조건을 체크하는 방법은? ',
    hint: '만약',
    correct_answer: 'if 문을 중첩하여 사용',
    incorrect_answers: [
      'else 문을 여러 번 사용',
      'elif 대신 elseif 사용',
      '불가능함',
    ],
  },
  {
    category: '분기문',
    question: '<b>switch 문</b>을 대체하기 위한 구조는?',
    hint: '파이썬은 switch문을 직접 지원하지 않는다',
    correct_answer: 'if-elif-else',
    incorrect_answers: ['for-in', 'while', 'try-except'],
  },
  {
    category: '분기문',
    question: '<b>pass 키워드</b>의 역할은? ',
    hint: 'pass는 아무 동작을 하지 않아요',
    correct_answer: '빈 블록을 만들 때 사용',
    incorrect_answers: [
      '예외 처리할 때 사용',
      '무한 루프에서 사용',
      '조건을 패스할 때 사용',
    ],
  },
];

const selectStage5 = [
  {
    category: '반복문',
    question:
      '하나 이상의 데이터에 대해 동일한 작업을</br> <b>반복해서 실행</b>하는 문법은 무엇일까요?',
    hint: '반복해서 실행하는 문법',
    correct_answer: '반복문',
    incorrect_answers: ['분기문', 'if else문', 'if문'],
  },
  {
    category: '반복문',
    question:
      'for 반복문은 주로 <b>___</b>인 작업을 수행할 때 사용됩니다</br>여기서 <b>빈칸</b>에 들어갈 단어는 무엇일까요?',
    hint: "'for'과 'while'은 파이썬의 대표적인 제어문으로 같은 작업을 여러번 수행하는데 유리해요",
    correct_answer: '반복적',
    incorrect_answers: ['집합적', '연산적', '개별적'],
  },
  {
    category: '반복문',
    question:
      'while 반복문에서 <b>조건이 항상 참(True)</b>이면 어떤 결과가 발생하는가? ',
    hint: '변하는 부분은 값 10, 20, 30 이에요',
    correct_answer: '무한 루프에 빠짐',
    incorrect_answers: [
      '오류가 발생함',
      '루프가 한 번 실행된 후 종료함',
      '다음 코드 블록을 실행하지 않음',
    ],
  },
  {
    category: '반복문',
    question: '다음 중 for 문의 <b>장점</b>이 아닌 것은 무엇일까요?',
    hint: "'for'문은 주로 시퀀스의 각 요소를 차례로 처리하는 데 </br> 사용되기 때문에 요소의 값을 직접 </br> 수정하는 데는 적합하지 않아요",
    correct_answer: '불변성',
    incorrect_answers: ['가독성과 간결성', '오류 감소', '코드 재사용'],
  },
  {
    category: '반복문',
    question: 'for 문의 <b>기본 구조</b>로 옳은 것은 무엇일까요?',
    hint: 'for 반복문은 시퀀스(리스트, 튜플, 문자열 등)의</br> 각 요소에 대해 순차적으로 작업을 반복합니다.',
    correct_answer: 'for 변수 in 시퀀스:',
    incorrect_answers: ['for 시퀀스 in 변수:', 'for 변수:', 'for 시퀀스:'],
  },
  {
    category: '반복문',
    question: 'range(5)은 어떤 범위를 나타내는가?',
    hint: 'range(5)는 0부터 4까지의 숫자를 생성하는</br> 객체를 만듭니다.',
    correct_answer: '0부터 4까지의 범위',
    incorrect_answers: [
      '1부터 4까지의 범위',
      '1부터 5까지의 범위',
      '0부터 5까지의 범위',
    ],
  },
  {
    category: '반복문',
    question:
      'while 문은 조건문이 <b>__</b>인 동안 속한 문장들이</br> 반복해서 수행되도록 합니다</br> 여기서 <b>빈칸</b>에 들어갈 단어는 무엇일까요?',
    hint: 'while 문 안의 문장을 수행할 때 입력 조건을 검사해서</br> 조건에 맞지 않으면 while 문을 빠져나갑니다.',
    correct_answer: '참',
    incorrect_answers: ['거짓', '조건', '문자열'],
  },
  {
    category: '반복문',
    question: 'while문의 <b>기본 구조</b>로 알맞은 것은 무엇일까요?',
    hint: 'while문의 조건문 끝에는 꼭 콜론(:)을 붙여 주셔야 해요',
    correct_answer: 'while 조건문:수행부분',
    incorrect_answers: [
      'while 시퀀스:수행부분',
      'while :수행부분',
      'while 리스트:수행부분',
    ],
  },
  {
    category: '반복문',
    question:
      'for문이나 while 반복문 중에서 <b>______ 문</b>을 만나면</br> 반복문은 빠져나간 후 반복문 이후부터 실행하고</br> <b>_________문</b>을 만나면 반복문의 처음으로 돌아간다</br> 여기서 빈칸은 무엇 무엇일까요?',
    hint: '부서지다,계속하다',
    correct_answer: 'break, continue',
    incorrect_answers: ['continue, break', 'continue, exit', 'exit, continue'],
  },
  {
    category: '반복문',
    question:
      '만약 while문에서 <b>조건이 거짓(false)</b>인 경우</br> 어떻게 될까요?',
    hint: 'if문과 흡사해요',
    correct_answer: 'while문을 빠져나와 다음 코드로 진행됩니다.',
    incorrect_answers: [
      '계속 조건을 실행합니다.',
      '프로그램이 완전 종료됩니다.',
      '오류가 생깁니다.',
    ],
  },
];

const selectStage6 = [
  {
    category: '클래스',
    question: '<b>객체</b>를 생성하기 위한 틀은 무엇일까요?',
    hint: '카테고리',
    correct_answer: '클래스',
    incorrect_answers: ['인스턴스', '변수', '객체'],
  },
  {
    category: '클래스',
    question: '<b>클래스의 장점</b>이 아닌 것은 무엇일까요?',
    hint: '객체지향 프로그래밍이에요',
    correct_answer: '처리속도가빠르다',
    incorrect_answers: [
      '코드의 관리가 용이해진다',
      '코드의 재사용성이 높아진다',
      '코드의 유지보수성이 높아진다',
    ],
  },
  {
    category: '클래스',
    question:
      '클래스에 인스턴스가 생성될 때 <b>자동으로 호출되는</b></br> <b>초기화 메소드</b>는 무엇일까요?',
    hint: '객체의 속성 초기화',
    correct_answer: '__init__',
    incorrect_answers: ['__it__', '__repr__', '__add__'],
  },
  {
    category: '클래스',
    question:
      '다음 중 클래스 메서드를 정의할 때 <b>첫 번째 매개변수</b>로</br> 사용되는 키워드는 무엇인가요?',
    hint: 'self가 인스턴스 메서드에서 현재 인스턴스를 나타낸다',
    correct_answer: 'cls',
    incorrect_answers: ['self', 'this', 'class'],
  },
  {
    category: '클래스',
    question: '<b>클래스 변수</b>에 대한 설명 중 아닌 것은 무엇일까요?',
    hint: '클래스 변수는 모든 인스턴스가 공통적으로 </br>사용하는 값을 저장한다',
    correct_answer: '각 인스턴스의 고유한 상태를 저장하는 데 사용된다 ',
    incorrect_answers: [
      '클래스 변수는 클래스 정의 내부에서 선언된다',
      '클래스 이름으로 접근할 수 있다',
      '클래스 변수는 해당 클래스로 생성된 모든 인스턴스가</br> 공유하는 변수이다',
    ],
  },
  {
    category: '클래스',
    question: '<b>인스턴스 생성자</b>에 대한 설명 중 맞는 것은 무엇일까요?',
    hint: '생성자',
    correct_answer: '인스턴스 생성자는 객체가 생성될 때 호출됩니다',
    incorrect_answers: [
      '인스턴스 생성자는 객체가 소멸될 때 호출됩니다',
      '객체가 사용한 자원을 해제하는데 사용됩니다',
      '클레스 내에 __del__이라는 특수 메서드로 정의됩니다',
    ],
  },
  {
    category: '클래스',
    question:
      '클래스에서 <b>인스턴스 변수</b>를 정의할 때 사용되는 키워드는 무엇인가?',
    hint: '__init__ 메서드 내에서',
    correct_answer: 'self',
    incorrect_answers: ['instance', 'var', 'attribute'],
  },
  {
    category: '클래스',
    question:
      '다음 중 <b>클래스 속성</b>을 정의할 때</br> 사용되는 키워드는 무엇인가?',
    hint: '객체의 상태나 특징을 나타내는 변수',
    correct_answer: 'attribute',
    incorrect_answers: ['attr', 'classattr', 'property'],
  },
  {
    category: '클래스',
    question: '<b>상속</b>의 종류 중 아닌 것은 무엇일까요?',
    hint: '이름을 잘봐요',
    correct_answer: '유산 상속',
    incorrect_answers: ['다중 상속', '계층 상속', '단일 상속'],
  },
  {
    category: '클래스',
    question:
      '<b>오버라이딩</b>할 때 자식 클래스의 메서드에서<br> 부모 클래스의 메서드를 호출하기 위해</br> 사용되는 키워드는 무엇인가?',
    hint: '__init__ 메서드 내에서 사용',
    correct_answer: 'super',
    incorrect_answers: ['base', 'parent', 'this'],
  },
];

const inputStage1 = [
  {
    category: '기초 문법',
    question:
      '( )는(은) 1990년 암스테르담의 귀도 반 로섬이</br> 개발한 <b>프로그래밍 언어</b>이다. 괄호안에 들어갈 답은?',
    hint: '배우기 쉬워요',
    correct_answer: '파이썬',
  },
  {
    category: '기초 문법',
    question: "화면에 <b>Mary's</b>을 출력하세요",
    hint: 'print()',
    correct_answer: 'print("Mary\'s")',
  },
  {
    category: '기초 문법',
    question:
      '<b>____() 함수</b>: 자료형을 확인할 수 있는 함수</br> 빈칸 안에 들어갈 함수는?',
    hint: '4글자',
    correct_answer: 'type',
  },
  {
    category: '기초 문법',
    question:
      "이코드의 실행결과는? <b>a = 100,b = 50,c = a + b</br> print(a,'+',b,'=',c)</b> ",
    hint: '대입해봐요',
    correct_answer: '100+50=150',
  },

  {
    category: '기초 문법',
    question: '파이썬에서 <b>변수</b>를 선언하는 키워드는?',
    hint: '는',
    correct_answer: '=',
  },
  {
    category: '기초 문법',
    question: '<b>x = 5</b>일때 x의 자료형은?',
    hint: 'x에할당된 값이5',
    correct_answer: '정수',
  },
  {
    category: '기초 문법',
    question: '<b>변수 age</b>에 정수 25를 할당하세요.',
    hint: '질문 그대로',
    correct_answer: 'age=25',
  },
];

const inputStage2 = [
  {
    category: '문자열',
    question: '두 문자열을 <b>이어 붙이는</b> 연산자는?',
    hint: 'add',
    correct_answer: '+',
  },
  {
    category: '문자열',
    question: '문자열을 <b>정수로 변환</b>하는 함수는?',
    hint: '정수의 자료형()',
    correct_answer: 'int()',
  },
  {
    category: '문자열',
    question: '두 문자열을 <b>비교하여 같은지 확인하는</b> 연산자는?',
    hint: '는2',
    correct_answer: '==',
  },
  {
    category: '문자열',
    question: '문자열을 <b>여러 번 반복</b>하는 연산자는?',
    hint: '곱하기',
    correct_answer: '*',
  },

  {
    category: '문자열',
    question:
      '<b>ticker = "btc_krw" </br> ticker1 = ticker.upper()</br> print(ticker1)</b> 이 코드의 결과값은?',
    hint: 'upper()',
    correct_answer: 'BTC_KRW',
  },

  {
    category: '문자열',
    question:
      '<b>ticker = "BTC_KRW" </br> ticker1 = ticker.lower()</br> print(ticker1)</b> 이 코드의 결과값은?',
    hint: 'lower()',
    correct_answer: 'btc_krw',
  },
];

const inputStage3 = [
  {
    category: '배열',
    question: '<b>리스트를 생성</b>하는 기호는?',
    hint: '괄호에요',
    correct_answer: '[]',
  },
  {
    category: '배열',
    question: '<b>튜플을 생성</b>하는 기호는?',
    hint: '괄호에요',
    correct_answer: '()',
  },
  {
    category: '배열',
    question: '딕셔너리에서 <b>모든 키</b>를 얻는 메서드는?',
    hint: '모든 키',
    correct_answer: 'keys()',
  },
  {
    category: '배열',
    question:
      '리스트(List)에서 <b>특정 위치에 요소를 </br>삽입</b>하는 메서드는 무엇인가요??',
    hint: '요소를 삽입',
    correct_answer: 'insert()',
  },
];

const inputStage4 = [
  {
    category: '분기문',
    question:
      '<b>if True:</br>print("안녕")</br>if False:<br>print("반가워")</b>에 결과값은?',
    hint: 'True = 참 False = 거짓',
    correct_answer: '안녕',
  },
  {
    category: '분기문',
    question: 'if문과 else문 사이에 위치하는 코드 블록은 무엇인가요?',
    hint: 'else if의 줄임말 ',
    correct_answer: 'elif',
  },
  {
    category: '분기문',
    question:
      'if,else문에서 <b>조건이 참일 때 실행</b>되는</br> 코드 블록은 무엇인가요',
    hint: '조건이 참 일때만 실행',
    correct_answer: 'if',
  },
  {
    category: '분기문',
    question: ' 예외 처리에서 <b>모든 예외를 처리</b>하는 키워드는 무엇인가요?',
    hint: '키워드 뒤에 어떤 예외 타입도 명시되지 않으면 모든 예외에 대한 처리가 이루어진다',
    correct_answer: 'except',
  },
];

const inputStage5 = [
  {
    category: '반복문',
    question: '리스트를 <b>순회할 때</b> 사용되는 키워드는 무엇인가요?',
    hint: '?반복문',
    correct_answer: 'for',
  },
  {
    category: '반복문',
    question:
      '반복문에서 특정 조건을 만족하면</br> <b>반복을 멈추게 하는</b> 키워드는 무엇인가요?',
    hint: '멈추다',
    correct_answer: 'break',
  },
  {
    category: '반복문',
    question:
      '반복문에서 <b>현재 반복을 건너뛰고</br> 다음 반복으로 진행</b>하는 키워드는 무엇인가요?',
    hint: '계속하다',
    correct_answer: 'continue',
  },
  {
    category: '반복문',
    question: '<b>range(8)<b>의 결과는 무엇인가요?',
    hint: '배열',
    correct_answer: '[0,1,2,3,4,5,6,7]:',
  },
];

const inputStage6 = [
  {
    category: '클래스',
    question:
      '클래스를 정의할 때 <b>상속받을 부모 클래스가 없는 경우<b>에</br> 사용하는 키워드는 무엇인가요?',
    hint: '객체',
    correct_answer: 'object',
  },
  {
    category: '클래스',
    question:
      '클래스에서 인스턴스 변수를 <b>직접 접근하지 않고<b></br> <b>메서드를 통해 접근<b>하는 디자인 원칙은 무엇인가요?',
    hint: '코드의 유지보수성을 높이고 오류를 방지할 수 있어요',
    correct_answer: '캡슐화',
  },
  {
    category: '클래스',
    question:
      '클래스에서 사용되는 <b>@classmethod 데코레이터</b>는</br> 무엇을 나타내나요?',
    hint: '@classmethod',
    correct_answer: '클래스메서드',
  },
  {
    category: '클래스',
    question:
      '클래스에서 사용되는 <b>@staticmethod 데코레이터</b>는<br> 무엇을 나타내나요?',
    hint: '@staticmethod',
    correct_answer: '정적메서드',
  },
];
