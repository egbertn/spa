import React, {useState} from 'react';

import { CSSTransition } from 'react-transition-group';
import Modal from 'react-modal';

import './styles.css';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		borderRadius: '50px'
	},
};
const modalStyles = {
	overlay: {
	  backgroundColor: '#ffffff',
	},
  };

export
	const DialogNoId = React.forwardRef ( (props, ref) => {
	const root = props.appElement ?? document.getElementById('root');
	const [isOpen, setIsOpen] = useState(false);
	const [boxVisible, setBoxVisible] = useState(false);

	return root && <Modal closeTimeoutMS={500} appElement={root} onRequestClose={props.onClose}
		isOpen={props.isOpen} style={customStyles}>
		 <CSSTransition
            in={boxVisible}
            timeout={500}
            classNames="dialog"
          >
			<div className="dialog">
				<div className="caption">
					<div style={{ lineHeight:'80px', flex: 4 }}>
						{props.caption}
					</div>
					<div style={{ flex: 1 }}>
						<a href="#" aria-label="Close modal"
							onClick={(e) => { e.preventDefault(); props.onClose() }}>
							<span className="closeIcon"></span></a>
					</div>
				</div>
				<div className="text" >
					{props.message}
				</div>
				<div className="command">
					<button className="btn btn-round"
						onClick={(e) => { e.preventDefault(); props.onClose() }}>
						Sluiten
					</button>
				</div>
				</div>
			</CSSTransition>
	</Modal>
	})

export
	const DialogContent = (props) => {
		const root = props.appElement ?? document.getElementById('root');

		const [boxVisible, setBoxVisible] = useState(false);

		return root && <Modal closeTimeoutMS={500} appElement={root} onRequestClose={props.onClose}
			isOpen={props.isOpen} style={customStyles}>
			<CSSTransition
				in={boxVisible}
				timeout={500}
				classNames="dialog"
			>
				<div className="card" >
					<div className="card-body " >
						<h5 className='card-title' style={{ lineHeight: '80px'}}>
							{props.caption}
						</h5>
						<div>
							<a href="#" aria-label="Close modal"
								onClick={(e) => { e.preventDefault(); props.onClose() }}>
								<span className="closeIcon"></span></a>
						</div>
						<h5 class="card-title">{props.summary}</h5>
						<div class="card-text ">{props.body}</div>
						<div className="command text-center">
							<button className="btn btn-round"
								onClick={(e) => { e.preventDefault(); props.onClose() }}>
								Sluiten
							</button>
						</div>
					</div>



				</div>
			</CSSTransition>
		</Modal>
	}


export default DialogNoId;