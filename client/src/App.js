import './App.css';
import CSSReset from '@tds/core-css-reset';
import DataTool from './components/DataTool/DataTool';
import PageHeading from './shared-components/PageHeading';

function App() {
  return (
    <>
      <CSSReset />
      <div>
        <PageHeading />
        <DataTool />
      </div>
    </>
  );
}

export default App;
