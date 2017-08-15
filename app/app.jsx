import React from 'react';
import ReactDOM from 'react-dom';

import MainApp from 'MainApp';

//Load foundation
$(document).foundation();

//APP CSS
import 'style-loader!css-loader!sass-loader!applicationStyles';

ReactDOM.render(
	<MainApp />,
	document.getElementById("app")
);