/*eslint-disable*/
import { Navbar, Container, Nav} from 'react-bootstrap'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import data from './data.js'

import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './routes/Detail.js'

import axios from 'axios'
import Cart from './routes/Cart.js'

import ReactWeather from './routes/weather';

import GoogleMap from './routes/map';
import Fig from "figlet";
import standard from "figlet/importable-fonts/Standard.js";



// 임포트시 같은게 있으면 안된다



function App() {
  
  // useEffect(()=>{
  //   localStorage.setItem('watched',JSON.stringify([]))
  // },[])
  

  let [shoes, setShoes] = useState(data);

  // let [shoes] = useState(data)
  // console.log(shoes[0].title);

  // 페이지 이동을 도와주는 함수
  //훅이란? 유용한 것들이 들어있는 함수들
  let navigate = useNavigate();

  return (
    
    <div className="App"> 

      <Navbar bg="light" variant="light">
        <Container>
        <Navbar.Brand onClick={()=>{ navigate('/') }}>ShopShop</Navbar.Brand>
        {/* <Navbar.Brand href="#home">ShopShop</Navbar.Brand> */}
        <Nav className="me-auto">
           {/* <Link to="/">홈</Link> */}
           {/* <Link to="/detail">상세페이지</Link>  */}
          
          
          <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
          <Nav.Link onClick={()=>{ navigate('/detail') }}>Detail</Nav.Link>
          <Nav.Link onClick={()=>{ navigate('/about') }}>about</Nav.Link>

          <Nav.Link onClick={()=>{ navigate('/cart') }}>Cart</Nav.Link>
          <Nav.Link onClick={()=>{ navigate('/member') }}>member</Nav.Link>
          <Nav.Link onClick={()=>{ navigate('/location') }}>location</Nav.Link>
          {/* <Nav.Link_a onClick={()=>{ navigate('/login') }}>login</Nav.Link_a>
          <Nav.Link_a onClick={()=>{ navigate('/sign_up') }}>sign_up</Nav.Link_a> */}
          {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
        </Nav>
        </Container>\
          {/* <Container></Container> */}
      </Navbar>

      {/* 
      <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link> 
      */}
      

      <Routes>
       {/* <Route path="/" element={ <div>메인페이지임</div> } />  */}
       <Route path="/" element={ 
        <>
        <div className="main-bg"></div>
        <div className="container">
          
          <div className="row">
            { shoes.map((a, i)=>{
              return <Card shoes={shoes[i]} i={i} ></Card>
              })}
            </div>
          </div> 

          <button onClick={()=>{
            // get 방식이 아닌 post 방식으로 내부에 있는 json파일 호출해보기
      axios.get('https://codingapple1.github.io/shop/data2.json').then((결과)=>{
        console.log(결과.data)
        //[{},{},{}]
        let copy = [...shoes, ...결과.data]
        //{},{},{} {},{},{}    
        setShoes(copy)
      })
      
      
      //axios.post('URL', {name : 'kim'})
      //이거 실행하면 서버로 { name : 'kim' } 자료가 전송됩니다. 

      // 이러면 URL1, URL2로 GET요청을 동시에 해줍니다.
      // 둘 다 완료시 특정 코드를 실행하고 싶으면 .then() 뒤에 붙이면 됩니다.
      //Promise.all( [axios.get('URL1'), axios.get('URL2')] )
      // .then(()=>{

      // })

      //원래 서버와 문자자료만 주고받을 수 있음 
      // object/array 이런거 못주고받습니다.
      // 근데 방금만해도 array 자료 받아온 것 같은데 그건 어떻게 한거냐면 
      // object/array 자료에 따옴표를 쳐놓으면 됩니다.
      // "{"name" : "kim"}"
      // 이걸 JSON 이라고 합니다.
      // JSON은 문자 취급을 받기 때문에 서버와 자유롭게 주고받을 수 있습니다.
      
      // 그래서 실제로 결과.data 출력해보면 따옴표쳐진 JSON이 나와야하는데
      // axios 라이브러리는 JSON -> object/array 변환작업을 자동으로 해줘서 
      // 출력해보면 object/array가 나옵니다. 

      .catch(()=>{
        console.log('실패함')
      })
    }}>버튼</button>
     {/* 그림안나옴 */}

        </>
      } /> 
      
      {/* <Route path="/detail" element={<Detail shoes={shoes}/>} />  */}

      <Route path="/detail/:id" element={ 
          <Detail shoes={shoes}/> 
      }/>

  {/* 장바구니 */}
      <Route path="/cart" element={<Cart/> 
        
      } /> 


      {/* <Route path="/detail/0" element={<Detail shoes={shoes}/>} /> */}
      {/* <Route path="/about" element={<About/>} /> */}

      <Route path="/about" element={ <About/> } > </Route>   
      <Route path="/member" element={ <div>여기<ReactWeather></ReactWeather></div> } />
        <Route path="/location" element={ <div>회사위치{<>
        <GoogleMap onLoad={map => {
                const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
  }}
  onUnmount={map => {
    // do your stuff before map is unmounted
  }}
/>CCCC</>}</div> } />
      <Route path="*" element={ <div>없는페이지임 똑바로 안칠래!!</div> } />
      
      </Routes>
      
      {/* <div className="main-bg" ></div>  
      <div className="container">
        <div className="row">     
        {
          shoes.map((a,i)=>{  
            return(
              //1 <Card shoes={shoes[0]} i={1}></Card>
              //2 <Card shoes={shoes[i]} i={i+1}></Card>
              <Card shoes={shoes[i]} i={i}></Card>
            )
          })
         }          
        </div>
      </div> */}
    </div>
  )
}



function About(){
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet> 
      {/* 동시에 보여주기 위하여 */}
    </div>
  )
}

function Card(props){
  return (
    <div className="col-md-4">
      <img src={process.env.PUBLIC_URL + '/shoes' + (props.i+1) + '.jpg'} width ='60%' />
      {/* <img src='./shoes1.jpg' width="80%" /> */}
      {/* <img src="c:\shop\shoes/shoes1.jpg" width="80%" /> 허용을 안하네 로컬장소 */}
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.price }</p>
    </div>
  )

}

export default App;
