import React, { Component } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { DragDropContext } from 'react-beautiful-dnd';
import { LIST_TO_DO_STATUS, TO_DO_STATUS } from '../constants';
import ColumnStatus from './ColumnStatus';
import ItemDetailModal from './ItemDetailModal';

const saveNewItems = (type, items) => {
  localStorage.removeItem(type, items);
  localStorage.setItem(type, JSON.stringify(items));
};

const getItems = (type) => JSON.parse(localStorage.getItem(type)) || [];
class Board extends Component {
  state = {
    [TO_DO_STATUS.TO_DO]: getItems(TO_DO_STATUS.TO_DO),
    [TO_DO_STATUS.DOING]: getItems(TO_DO_STATUS.DOING),
    [TO_DO_STATUS.DONE]: getItems(TO_DO_STATUS.DONE),
    // item detail modal
    showedItem: null,
  };

  onAddItem = (item) => {
    const { type } = item;
    this.setState((prevState) => {
      const newItems = [...prevState[type], item];
      saveNewItems(type, newItems);
      return {
        [type]: newItems,
      };
    });
  };

  onDeteteItem = (item) => {
    const { id, type } = item;
    this.setState((prevState) => {
      const newItems = prevState[type].filter((item) => item.id !== id);
      saveNewItems(type, newItems);
      return {
        [type]: newItems,
      };
    });
  };

  onUpdateItem = (item) => {
    const { type, id } = item;
    this.setState((prevState) => {
      const newItems = [...prevState[type]].map((_item) => {
        if (_item.id === id) return item;
        return _item;
      });
      saveNewItems(type, newItems);
      return {
        [type]: newItems,
      };
    });
  };

  onDragEnd = (result) => {
    // the only one that is required
    if (!result.destination) {
      return;
    }
    const { destination, source } = result;
    console.log({ destination, source });
    if (destination.droppableId === source.droppableId) {
      const items = [...this.state[destination.droppableId]];
      const item = items[source.index];
      items.splice(source.index, 1);
      items.splice(destination.index, 0, item);
      saveNewItems(destination.droppableId, items);
      this.setState({
        [destination.droppableId]: items,
      });
    } else {
      const _source = [...this.state[source.droppableId]];
      _source.splice(source.index, 1);
      const _destination = [...this.state[destination.droppableId]];
      const item = {
        ...this.state[source.droppableId][source.index],
        type: destination.droppableId,
      };
      _destination.splice(destination.index, 0, item);
      saveNewItems(source.droppableId, _source);
      saveNewItems(destination.droppableId, _destination);
      this.setState({
        [source.droppableId]: _source,
        [destination.droppableId]: _destination,
      });
    }
  };

  onShowItem = (item) => {
    this.setState({
      showedItem: item,
    });
  };

  onCloseShowItem = () => {
    this.setState({
      showedItem: null,
    });
  };

  render() {
    const { showedItem } = this.state;
    return (
      <Box bgImage="url('./background.jpg')" height="100vh" overflowY="auto">
        <ItemDetailModal
          item={showedItem}
          onClose={this.onCloseShowItem}
          onUpdateItem={this.onUpdateItem}
        />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Box w="100%" textAlign="center" color="white" pt="1rem">
            <Text fontSize="40px" fontWeight="bold">
              “To-do list : to-do list!”
            </Text>
            <Text fontSize="20px">
              You can always change your plan, but only if you have one.
            </Text>
          </Box>
          <Box
            p="1rem"
            d="flex"
            height="calc(100vh - 7rem)"
            alignItems="baseline"
            justifyContent="center"
          >
            {LIST_TO_DO_STATUS.map(({ value, text }) => (
              <ColumnStatus
                key={value}
                type={value}
                text={text}
                values={this.state[value]}
                onAddItem={this.onAddItem}
                onDeteteItem={this.onDeteteItem}
                onShowItem={this.onShowItem}
                onUpdateItem={this.onUpdateItem}
              />
            ))}
          </Box>
        </DragDropContext>
      </Box>
    );
  }
}

export default Board;
