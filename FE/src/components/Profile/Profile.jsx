import React from 'react'

const Profile = () => {
  return (
    <div className='profile box'>
      <h4>프로필</h4>
      <div>
        <h3>정상인 (2000.04.07) / 한국해양대학교 데이터정보학과</h3>
        <p>장점 : 개발이 재밌어서 매일 함, 프로그래밍적으로 효율충, 자바스크립트를 사랑함</p>
        <p>단점 : 디자인.... 깔끔하게는 만드려고 노력하지만 많이 부족함</p>
        <a href="https://github.com/SanginJeong" target='_blank'>Github 주소</a>
        <h3>Stack</h3>
        <p>- HTML, CSS</p>
        <p>- JavaScript, TypeScript</p>
        <p>- React, Next.js</p>
        <p>- NodeJs, MongoDB, Express</p>
        <p>- react-query, redux, Tailwind </p>
      </div>
    </div>
  )
}

export default Profile