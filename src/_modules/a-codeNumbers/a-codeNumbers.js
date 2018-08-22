
import _$$ from '../../_scripts/_helpers/_$selector';

export default function(){

	// putting lines by the pre blocks
	_$$("pre:not(.no-lines)").forEach(function(_$code, index, listObj){
		const lines = _$code.innerText.split("\n");

		const numbers = lines.map((text, i) => i+1);

		const remove_empty_ends = (numbersArr, linesArr) => {
			trim_numbers(numbersArr, linesArr);
			const reversed = [...linesArr].reverse();
			trim_numbers(numbersArr, reversed);
		}

		function trim_numbers(numbersArr, linesArr) {
			linesArr.some(line => {
				if (line === '') {
					numbersArr.pop();
					return false;
				}
				return true;
			})
		}

		remove_empty_ends(numbers, lines);

		const originalHTML = _$code.outerHTML;

		_$code.outerHTML = `
		<div class="a-codeNumbers">
			<pre class="a-codeNumbers__numbers">${numbers.join("\n")}</pre>
			<div class="a-codeNumbers__code">${originalHTML}</div>
		</div>`;
	});

}
