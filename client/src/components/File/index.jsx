import './style.scss';

const File = (props) => {
    return (props.new === true) ? (
        <div className="file-wrapper-new" style={{ border: '1px dotted #00000;' }} onClick={props.onClick}>
            <div className="content">
                <div id="title">New File</div>
                <div id="icon">+</div>
            </div>
        </div>
    ) : (
        <div className="file-wrapper-main">
            <div className="thumbnail" style={{ backgroundImage: `url(${props.image})` }} onClick={props.onClick}>
            </div>
            <div className="info">
                <div id="title">
                    {props.name}
                </div>
                
                <div id="date">
                    {props.date}
                </div>
            </div>
        </div>
    );
};

export default File;