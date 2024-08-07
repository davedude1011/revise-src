function Curriculum({ curriculumSrc }: { curriculumSrc: string }) {
  return (
    <div className="w-full h-screen m-0 bg-gray-500 scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-transparent">
      <iframe
        className="w-full h-full iframe-quizlet"
        src={curriculumSrc}
      ></iframe>
    </div>
  );
}

export default Curriculum;
