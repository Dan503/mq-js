
import _$$ from '../../_scripts/_helpers/_$selector';

export default function(){

  // putting lines by the pre blocks
  _$$("pre:not(.no-lines)").forEach(function(_$code, index, listObj){
    const lines = _$code.innerText.split("\n");

    const numbers = lines.map((text, i) => i+1);

    const remove_empty_ends = (numbersArr, linesArr) => {
      numbersArr.pop();
      const reversed = [...linesArr].reverse();
      reversed.some(line => {
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
    <div class="code-lines">
      <pre class="lines">${numbers.join("\n")}</pre>
      ${originalHTML}
    </div>`;
  });

}
