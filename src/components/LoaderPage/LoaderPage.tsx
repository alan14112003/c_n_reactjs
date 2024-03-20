const LoaderPage = () => {
  return (
    <div className="w-full h-screen bg-[#b2ebf2] flex justify-center items-center">
      <div
        className="border-4 border-[#f3f3f3] border-t-4 border-t-[#3498db] rounded-full w-30 h-30 animate-spin"
        style={{
          borderTopColor: '#3498db',
          borderWidth: '16px',
          width: '120px',
          height: '120px',
        }}
      ></div>
    </div>
  )
}

export default LoaderPage
