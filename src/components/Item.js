import React, { Component } from 'react';
import { Box, Text, IconButton } from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';
import { CloseIcon } from '@chakra-ui/icons';
import { ITEM_PRIORITIES } from '../constants';
class Item extends Component {
  state = {};

  _onDelete = (e) => {
    const { onDeteteItem, value } = this.props;
    onDeteteItem(value);
  };

  _onShowItem = () => {
    const { value, onShowItem } = this.props;
    onShowItem(value);
  };

  render() {
    const { value, index } = this.props;
    return (
      <Draggable draggableId={value?.id} index={index}>
        {(provided, snapshot) => (
          <Box
            p="0.5rem 0.5rem"
            borderRadius="3px"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Box
              bg="white"
              p="1rem 0.5rem"
              boxShadow="0 1px 0 rgb(9 30 66 / 25%)"
              borderRadius="5px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              borderLeft={`10px solid ${
                ITEM_PRIORITIES[value?.priority].color
              }`}
            >
              <Text onClick={this._onShowItem}>{value?.title || ''} </Text>
              <IconButton onClick={this._onDelete} variant="link" mr="1rem">
                <CloseIcon fontSize="12px" />
              </IconButton>
            </Box>
          </Box>
        )}
      </Draggable>
    );
  }
}

export default Item;
