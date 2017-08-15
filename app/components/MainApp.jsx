import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import uuid from 'node-uuid';

var $ = require('jquery'); 

class MainApp extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: '',
			calc:'',
			logs:'',
		}
	}

	render() {
		var process = (text) => {
			var c = text.split(' ');
			var b = text.split(' ');
			for(var i = 0; i < c.length; i++) {
				var num = false;
				var oper = false;
				var err = false;
				var dot = false;
				for(var j = 0; j < c[i].length; j++) {
					switch(c[i][j]) {
						case '+':
						case '-':
						case '*':
						case '/':
						case '(':
						case ')':
							if(oper == false) oper = true;
							else err = true;
							break;
						case '0':
						case '1':
						case '2':
						case '3':
						case '4':
						case '5':
						case '6':
						case '7':
						case '8':
						case '9':
							num = true;
							break;
						case '.':
							if(dot == false) {
								dot = true;
							} else {
								err = true;
							}
							break;
						default:
							err = true;
							break;
					} // end switch
				} // end for j
				if(err == true) {
					b[i] = 'err';
				} else if (num == true && oper == false) {
					b[i] = 'num';
				} else if (num == false && oper == true) {
					// b[i] = 'oper';
				} else {
					b[i] = 'err';
				}
			} // end for i

			var result = '';
			var leftB = 0;
			var num = false;
			var oper = false;
			for(var i = 0; i < b.length; i++) {
				if(b[i] == 'err') {
					result += 'ERROR: ERROR! ';
				}
				if(b[i] == 'num' && !num) {
					num = true;
					oper = false;
				} else if(b[i] == 'num' && num) {
					result += 'ERROR: two consec nums! ';
				}
				if(b[i] != 'num'){
					if(b[i] == '(') {
						if(oper) {
							leftB++;
						} else {
							leftB++;
							result += 'ERROR: xz; ';
						}
					}
					else if(b[i] == ')' && num) {
						leftB--;
						oper = false;
						num = true;
					} else if(!oper) {
						oper = true;
						num = false;
					} else {
						result += 'ERROR: two consec oper! ';
					}
					if(leftB < 0) result += 'ERROR: wrong brackets sequence! '
				}
			}
			// 42 + 5 - 4 * ( 5 - 2 * 3 ) 
			// => 51
			if(leftB > 0) result += 'ERROR: NOLB NE NORB! ';
			// result += ` ${leftB}; `

			if(result == '') { // if no errors, we can calculate
				var i = 0;
				var reduceBrackets = (index, b) => {
					b = mainLoop(b);
				}
				var reduceMul = () => {

				}
				var reduceSumm = () => {

				}
				var findBrackets = (b) => {
					for(var i = 0; i < b.length; i++) {
						if(b[i] == '(') {
							return i;
						}
					}
					return -1;
				}
				var mainLoop = (b) => {
					var index = findBrackets(b);
					if(index >= 0) {
						b = reduceBrackets(index, b);
					} else {
						index = findMul(b);
						if(index >= 0) {
							b = reduceMul(b);
						} else {
							index = findSum(b);
							if(index >= 0) {
								b = reduceSum(b);
							}
						}
					}
					return b;
				}
				while(b.length > 1) {
					b = mainLoop(b);
				}
			}

			this.setState({
				logs:`[${b.join(' ')}]`,
				calc:`${result}`,
			});

		} // end process func
		return (
			<div className='cardFlex columnOrder justifyAround'>
				<h1 className='page-title'>
					{'SIMPLE CALCULATOR'}
				</h1>
				<div className='cardGap'> </div>
				<div className='cardGap'>
					<input 
					type='text' 
					placeholder='Input math' 
					value={this.state.value} 
					onChange={(e) => {
						process(e.target.value);
						this.setState({
							value:e.target.value,
						})
					}} />
				</div>
				<div className='cardGap'> </div>
				<div className='cardGap'>{this.state.logs}</div>
				<div className='cardGap'>{this.state.calc}</div>
				<div className='cardGap'> </div>
			</div>
		);
	}
}

export default MainApp;