import React from 'react';
import ReactDOM from 'react-dom';

import AppHooks from './AppHooks';
import AppClass from './AppClass';

const App = (
    <div>
        <div style={{ float: 'left', width: '50%', height: '100%' }}>
            <AppHooks/>
        </div >
        <div style={{ float: 'left', width: '50%' }}>
            <AppClass/>
        </div>
    </div >
);

ReactDOM.render(App, document.getElementById('root'));

