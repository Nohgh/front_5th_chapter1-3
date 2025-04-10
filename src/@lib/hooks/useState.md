# useState

const [state, setState]=useState(initialState)

# useState의 매개변수

initialState: state의 초기 설정값, 어떤 유형의 값이든 지정할 수있다.  
초기 렌더링 이후에는 무시된다.  
함수에 대해서는 특별한 동작이 있다.  
함수를 initialState로 전달하면 이를 초기화 함수로 취급한다.  
이 초기화 함수는 순수해야하고 인수를 받지 않아야 하며, 반드시 어떤 값을 반환해야 한다.

리액트는 컴포넌트를 초기화 할 때 초기화 함수를 호출하고, 그 반환값을 초기 state로 지정한다.

# 반환값

두 개의 값을 가진 배열을 반환한다.

1. 현재 state. 첫번째 렌더링 중에 전달한 initialState와 일치합니다.
2. state를 다른 값으로 업데이트하고 리렌더링을 촉발할 수 있는 set함수

# 주의사항

useState는 hook이므로 컴포넌트의 최상위 레벨이나 직접 만든 훅에서만 호출할 수 있다.

# setSomething(nextState)와 같은 set함수

set함수를 사용하면 state를 다른 값으로 업데이트하고 리렌더링을 촉발할 수 있다.  
여기에는 다음 state를 직접 전달하거나 이전 state로부터 계산된 함수를 전달할 수 도 있다.  
setName('hoon')  
setAge(a=> a+1);

# setSomething(nextState)에서 매개변수인 nextState

state가 될 값이다. 모든 데이터 타입이 허용되지만, 함수에 대해서는 특별한 동작이 있다.

# 함수를 setState의 매개변수로 전달하면 업데이터 함수로 취급

이 함수는 순수해야하고, 대기중인 state를 유일한 인수로 사용해야하며, 다음 state를 반환해야합니다.  
React는 업데이터함수를 대기열에 넣고 컴포넌트를 리렌더링합니다.  
다음 렌더링중에 리액트는 대기열에 있는 모든 업데이터를 이전 state에 적용시켜 다음 state를 계산합니다.

# setState의 반환값: set함수는 반환값이 없다.

사용자가 제공한 새로운 값이 Object.is에 의해 현재 state와 동일하다고 판정되면, React는 컴포넌트와 그 자식들을 리렌더링하지 않습니다.  
이것이 최적화이다.

# 리액트는 state업데이트를 batch합니다.

모든 이벤트핸들러가 실행되고, set함수를 호출한 후에 화면을 업데이트합니다.  
이렇게하면 단일 이벤트 중에 여러번 리렌더링하는것을 방지할 수 있다.  
드물게 돔에 접근하기 위해 리액트가 화면을 더 일찍 업데이트해야하는 경우, flushSync를 사용할 수 있다.

리액트는 다음 state를 저장하고 새로운 값으로 컴포넌트를 다시 렌더링한 후 UI를 업데이트합니다.  
set함수를 호출해도 이미 실행중인 코드의 현재 state는 변경되지 않습니다.  
set함수는 다음 렌더링에서 반환할 useState에만 영향을 줍니다.

# 이전 state를 기반으로 state업데이트하기

setAge(age+1) setAge(age+1) setAge(age+1)  
해당 코드에서는 42에서 45가 아닌 43이 된다.  
이를 해결하기 위해서는 state대신 setAge에 업데이터 함수를 전달해야한다.  
setAge(a=>a+1)  
위의 함수는 대기중인 state를 가져와서 다음 state를 계산한다  
React는 업데이터 함수를 큐에 넣는다. 그러면 다음 렌더링 중에 동일한 순서로 호출한다.  
a=>a+1은 대기중인 state로 42를 받고 다음 state로 43을 반환한다.  
a=>a+1은 대기중인 state로 43을 받고 다음 state로 44를 반환한다.

# 객체 및 배열 state업데이트하기

state에는 객체와 배열도 넣을 수 있다.  
리액트에서 state는 읽기 전용으로 간주되므로 기존 객체를 변경하지 않고, 교체해야한다.  
예를 들어 state에 form객체가 있는 경우  
setForm(  
{...form, firstName:"Talu"}  
)

# 초기 state다시 생성하지 않기

리액트는 초기 state를 한 번 저장하고 다음 렌더링부터는 이를 무시한다.

const [todos,setTodos] = useState(createIniitialTodos())  
이런 함수의 결과를 줄 수 있는데, 값비싼 계산을 수행하는 경우, 낭비일 수 있습니다.  
이 문제를 해결하려면, usestate에 초기화 함수로 전달해야한다.  
useState(createInitialTodos)  
이런식으로 함수자체인 createInitialTOdos를 전달하면 리액트는 초기화중에만 함수를 호출할 수 있다
