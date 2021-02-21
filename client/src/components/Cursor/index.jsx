const colors = ['#FF0000', '#AD00FF', '#FFAA29']

const Cursor = (props) => {
  return (
    <div 
      className="cursor"
      style={{
      position: 'absolute',
      left: props.x + 'px',
      top: props.y + 'px',
    }}> 
      <svg width="23" height="29" viewBox="0 0 27 33" fill="black" stroke={colors[props.number]} stroke-width="4" stroke-linecap="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.89267 0.403686C2.63393 0.190439 2.31988 0.0551578 1.98717 0.0136211C1.65446 -0.0279157 1.3168 0.0260047 1.01357 0.169093C0.710346 0.312181 0.454053 0.538538 0.274591 0.82176C0.0951286 1.10498 -0.000104185 1.43339 8.55326e-08 1.76869V26.519C8.55326e-08 28.1563 2.03336 28.9149 3.10484 27.6772L9.33575 20.4756C9.58475 20.188 9.89267 19.9575 10.2386 19.7994C10.5846 19.6414 10.9605 19.5596 11.3408 19.5597H21.2282C22.8867 19.5597 23.6329 17.4803 22.3528 16.4265L2.89267 0.403686Z"/>
      </svg>
    </div>
  )
}

export default Cursor;