import {Button, ConfigProvider, DatePicker, message, Space, Switch} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
function App() {

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'This is a success message',
        });
    };
    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'This is an error message',
        });
    };
    const warning = () => {
        messageApi.open({
            type: 'warning',
            content: 'This is a warning message',
        });
    };
  return (
    // <div className="App">
    //   <Button type="primary" >按钮</Button>
    //
    //     <Space direction="vertical">
    //         <DatePicker onChange={onChange} />
    //         <DatePicker onChange={onChange} picker="week" />
    //         <DatePicker onChange={onChange} picker="month" />
    //         <DatePicker onChange={onChange} picker="quarter" />
    //         <DatePicker onChange={onChange} picker="year" />
    //     </Space>
    //
    //     <Space>
    //         <Button onClick={success}>Success</Button>
    //         <Button onClick={error}>Error</Button>
    //         <Button onClick={warning} >Warning</Button>
    //     </Space>
    //
    //     <Switch defaultChecked onChange={onChange} />
    // </div>

      <ConfigProvider
          theme={{
              token: {
                  // Seed Token，影响范围大
                  colorPrimary: '#00b96b',
                  borderRadius: 10,

                  // 派生变量，影响范围小
                  colorBgContainer: '#f6ffed',
              },
          }}
      >
          <Space>
              <Button type="primary">Primary</Button>
              <Button>Default</Button>
          </Space>
      </ConfigProvider>
  );
}

export default App;
