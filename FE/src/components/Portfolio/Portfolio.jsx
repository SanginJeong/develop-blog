import React from 'react'

const Portfolio = () => {
  const post = [
    {'title' : 'Netflix WebSite' , webURL: "https://react-study-netflix.vercel.app/", gitURL: "https://github.com/SanginJeong/react-study-netflix",},
  ]
  return (
    <div className='portfolio box'>
      <h4>포트폴리오</h4>
      <div className='post-area'>
        {post.map((post)=>(
          <div className="home-post-area">
            <a href={post.webURL} target='_blank' className='post'>{post.title}</a>
            <a href={post.gitURL} target='_blnak' className='post'>GitHub</a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Portfolio