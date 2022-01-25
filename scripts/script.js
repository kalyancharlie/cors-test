// CONSTANTS
const editorEle = document.getElementById("editor_textarea");
const loadingEle = document.getElementById('loader')
const editorDivEle = document.getElementsByClassName('CodeMirror')
const form = document.getElementById('submission_form')

// EDITOR CONFIG
const editorConfig = {
  theme: "default",
  height: "auto",
  viewportMargin: Infinity,
  mode: {
    name: "javascript",
    json: true,
    statementIndent: 2,
  },
  smartIndent: true,
  lineNumbers: true,
  lineWrapping: true,
  indentWithTabs: false,
  tabSize: 2,
};

const editor = CodeMirror.fromTextArea(editorEle, editorConfig);

document.addEventListener("DOMContentLoaded", async (e) => {
  try {
    editorDivEle[0].style.visibility = 'hidden'
    loadingEle.style.display = 'none'
  } catch (e) {
    console.log("Initialize Error");
  }
});

const submitHandler = (e) => {
    try {
        editorDivEle[0].style.visibility = 'hidden'
        loadingEle.style.display =  'block'
        e.preventDefault()
        const url = document.getElementById('url').value
        const method = document.getElementById('method').value
        callApi(url, method).then(data => {
            editorDivEle[0].style.visibility = 'visible'
            loadingEle.style.display = 'none'
        })
    } catch (error) {
        editorDivEle[0].style.visibility = 'visible'
        loadingEle.style.display = 'none'
    }
}

const callApi = async (url, method='GET') => {
    try {
        var resp = await fetch(url, {
            method,
        })
        const body = await resp.json()
        const respData = JSON.stringify(resp)
        const jsonResponse = {
            headers: [...resp.headers],
            url: resp.url,
            type: resp.type,
            ok: resp.ok,
            status: resp.status,
            statusText: resp.statusText,
            redirected: resp.redirected,
            body
        }
        editor.setValue(JSON.stringify(jsonResponse, null, '   '))
    } catch(error) {
        console.log(error)
    }
}

form.addEventListener('submit', submitHandler)