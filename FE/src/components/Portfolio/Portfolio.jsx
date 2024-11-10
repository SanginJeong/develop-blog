import React from 'react'

const Portfolio = () => {
  const post = [
    {'title' : '404 에러 해결'},
    {'title' : 'CORS 에러에 대해서'},
    {'title' : '404 에러 해결'},
    {'title' : 'CORS 에러에 대해서'},
    {'title' : '404 에러 해결'},
    {'title' : 'CORS 에러에 대해서'},
    {'title' : 'CORS 에러에 대해서'}
  ]
  return (
    <div className='portfolio box'>
      <h4>포트폴리오</h4>
      <div className='post-area'>
        {post.map((post)=>(
          <div className='post'>{post.title}</div>
        ))}
      </div>
    </div>
  )
}

export default Portfolio