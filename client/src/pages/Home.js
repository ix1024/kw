import React, {
    Component
} from 'react';
import {
    Form,
    Button,
    Input,
    Select,
    Icon
} from 'antd';
import { connect } from "react-redux";
import MyEditor from '../components/editor';
const { Option } = Select;
const { FormItem } = Form;
class Home extends Component {

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');

        return (

            <div className="">
                <Form>
                    <FormItem
                        validateStatus={userNameError ? 'error' : ''}
                        help={userNameError || ''}
                    >
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </FormItem>
                </Form>
                <Input placeholder="请输入标题" />
                <Select defaultActiveFirstOption="true" defaultValue="">
                    <Option value="">请选择</Option>
                    <Option value="1">HTML</Option>
                    <Option value="2">CSS</Option>
                    <Option value="3">Javascript</Option>
                </Select>
                <MyEditor />

                <Button type="primary">asdfas</Button>
            </div>

        );
    }
}
const mapStateToProps = (store) => {
    return {};
};
const mapDispatchToProps = (dispatch) => {
    return {

    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
