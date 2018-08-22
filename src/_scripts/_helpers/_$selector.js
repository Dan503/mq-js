
const isString = string => typeof string === 'string';
const _$ = selector => isString(selector) ? document.querySelector(selector) : selector;
const _$$ = selector => isString(selector) ? [...document.querySelectorAll(selector)] : selector;

export default _$$;
export { _$$, _$ }
