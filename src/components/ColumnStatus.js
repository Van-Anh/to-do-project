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
    const { onAddItem, type } = this.props;
    if (!value.title) return;
    const submittedValue = {
      ...value,
      type,
      id: `${type}_${Math.random()}`,
    };
    onAddItem(submittedValue);
    this.onClose();
  };

  render() {
    const { type, text, values, onDeteteItem, onShowItem } = this.props;
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
            overflowY="auto"
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            ref={provided.innerRef}
            bg={
              snapshot.isDraggingOver
                ? 'rgba(203, 213, 224, 0.9)'
                : 'rgba(235, 236, 240, 0.9)'
            }
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
                  onDeteteItem={onDeteteItem}
                  onShowItem={onShowItem}
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
                colorScheme="blue"
                variant="outline"
                alignItems="center"
                justifyContent="center"
                onClick={this.onClickAdding}
              >
                <AddIcon />
              </Button>
            )}
          </Box>
        )}
      </Droppable>
    );
  }
}

export default ColumnStatus;
