import "./flip-card.css"; //take the file of css 

function FlipCardOnlyUsingCss() {
  return (
    <div className="absolute mt-2 w-full border z-10 bg-white shadow-lg rounded">
        <h1>Animzated Flip card using pure css</h1>

        <div className="flip-card-conatiner">
            <div className="flip-card">
                <div className="flip-card-inner">

                    <div className="flip-card-front">
                        <h3 className="flip-card-title">Front Side</h3>
                    </div>

                    <div className="flip-card-back">
                        <h3 className="flip-card-title">back Side</h3>
                    </div>

                </div>
            </div>
        </div>


    </div>
  );
}
export default FlipCardOnlyUsingCss;
