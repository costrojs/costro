import { createElement } from '../../dist/tunnel'

const element = (
	<button
		style={{ color: 'red', backgroundColor: 'blue' }}
		dataset={{ user: 'guest', isLoggedIn: false }}
		class="btn btn-success"
		onClick={(e) => {
			e.preventDefault()
			console.log('Clicked !')
		}}
	>
		<span>
			<i>
				Hello 1<br id="br" />
			</i>
			<i>
				Hello 2<em data-id>22</em>
			</i>
			<i>
				Hello 3<b class="b">33</b>
			</i>
		</span>
		<div />
		<div></div>
		<div>{false}</div>
		<div>{null}</div>
		<div>{undefined}</div>
		<div>{true}</div>
	</button>
)

document.querySelector('body').appendChild(element)
