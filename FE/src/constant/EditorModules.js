import 'highlight.js/styles/github.css';
import hljs from 'highlight.js';

hljs.configure({
  languages: ["javascript", "ruby", "python", "java", "cpp", "kotlin", "sql"],
});

export const modules = {
    syntax: {
      highlight: (text) => hljs.highlightAuto(text).value,
    },
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }], // 제목 크기
      ['bold', 'italic', 'underline', 'strike'], // 굵게, 기울임, 밑줄, 취소선
      [{ color: [] }, { background: [] }], // 텍스트 색상 및 배경색
      [{ list: 'ordered' }, { list: 'bullet' }], // 리스트 (순서, 비순서)
      ['link', 'image'], // 링크, 이미지
      ['clean'], // 포맷 제거
      ['blockquote', 'code-block'],
      [{'align' : []}],
    ],
  };