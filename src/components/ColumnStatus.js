import React, { Component } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { Droppable } from 'react-beautiful-dnd';
import { AddIcon } from '@chakra-ui/icons';
import Item from './Item';
import NewItem from './NewItem';

class ColumnStatus extends Component {
  state = {
    isAdding: false,
  };

  onClickAdding = () => {
    this.setState({ isAdding: true });
  };

  onClose = () => {
    this.setState({ isAdding: false });
  };

  _onAdd = (value) => {
    const { onAddItem, type, values } = this.props;
    if (!value.title) return;
    const submittedValue = {
      ...value,
      id: `${type}_${values.length.toString()}`,
    };
    onAddItem(type, submittedValue);
    this.onClose();
  };

  render() {
    const { type, text, values, onDeteteItem } = this.props;
    const { isAdding } = this.state;
    return (
      <Droppable droppableId={type}>
        {(provided, snapshot) => (
          <Box
            w="30%"
            mx="1rem"
            p="1rem"
            borderRadius="10px"
            minHeight="100%"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            ref={provided.innerRef}
            bg={snapshot.isDraggingOver ? '#CBD5E0' : '#ebecf0'}
            {...provided.droppableProps}
          >
            <Box textAlign="center" mb="2rem" w="100%">
              <Text fontSize="20px" pb="1rem">
                {text}
              </Text>
              {values.map((value, index) => (
                <Item
                  key={value.id}
                  index={index}
                  value={value}
                  type={type}
                  onDeteteItem={onDeteteItem}
                />
              ))}
            </Box>
            {isAdding ? (
              <NewItem onAdd={this._onAdd} />
            ) : (
              <Button
                w="100%"
                p="1rem"
                d="flex"
                variant="outline"
                alignItems="center"
                justifyContent="center"
                onClick={this.onClickAdding}
              >
                <AddIcon />
              </Button>
            )}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    );
  }
}

export default ColumnStatus;
