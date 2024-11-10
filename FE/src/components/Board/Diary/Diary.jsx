import React from 'react'
const Diary = () => {
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
    <div className="diary box">
      <h4>개발일지</h4>
      <div className='post-area'>
        {post.map((post)=>(
          <div className='post'>{post.title}</div>
        ))}
      </div>
    </div>
  )
}

export default Diary