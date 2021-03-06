import React, { Component } from 'react';
import { Box, Button, Textarea } from '@chakra-ui/react';
import { ITEM_PRIORITIES } from '../constants';
class NewItem extends Component {
  state = {
    title: '',
  };

  onChangeTitle = (e) => {
    this.setState({ title: e.target.value });
  };

  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      this._onAdd();
    }
  };

  _onAdd = () => {
    const { onAdd } = this.props;
    const { title } = this.state;
    onAdd({ title, description: '', priority: ITEM_PRIORITIES.MEDIUM.value });
  };

  render() {
    const { title } = this.state;
    return (
      <Box p="0.5rem 0.5rem">
        <Textarea
          mt="0.5rem"
          placeholder="Enter title"
          onChange={this.onChangeTitle}
          value={title}
          bg="white"
          boxShadow="0 1px 0 rgb(9 30 66 / 25%)"
          onKeyDown={this.onKeyDown}
        />
        <Box d="flex" justifyContent="flex-end" mt="0.51rem">
          <Button
            onClick={this._onAdd}
            bg="#4299E1"
            color="#ffffff"
            variant="outline"
            disabled={!title}
          >
            ADD
          </Button>
        </Box>
      </Box>
    );
  }
}

export default NewItem;
