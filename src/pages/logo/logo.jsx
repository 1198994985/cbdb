import React from 'react'
import logo from './CBDB.png'
import './logo.less'
class Logo extends React.Component {
	render() {
		return (
			<div className="home-page">
				<h1 className="home-title">欢迎来到CBDB——中国历代人物传记资料库</h1>
				<img className="home-logo" src={logo} alt="logo" />
			</div>

		)
	}
}

export default Logo