import React, { Component } from 'react';
import { Box } from '@chakra-ui/react';
import { DragDropContext } from 'react-beautiful-dnd';
import { LIST_TO_DO_STATUS, TO_DO_STATUS } from '../constants';
import ColumnStatus from './ColumnStatus';

class Board extends Component {
  state = {
    [TO_DO_STATUS.TO_DO]: [
      {
        id: 'TO_DO_1',
        title: 'Task 1',
      },
      {
        id: 'TO_DO_2',
        title: 'Task 2',
      },
      {
        id: 'TO_DO_3',
        title: 'Task 3',
      },
    ],
    [TO_DO_STATUS.DOING]: [],
    [TO_DO_STATUS.DONE]: [],
  };

  onAddItem = (type, item) => {
    this.setState((prevState) => ({
      [type]: [...prevState[type], item],
    }));
  };

  onDeteteItem = (type, id) => {
    this.setState((prevState) => ({
      [type]: prevState[type].filter((item) => item.id !== id),
    }));
  };

  // onDragStart = () => {
  //   /*...*/
  // };
  // onDragUpdate = () => {
  //   /*...*/
  // };
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
      this.setState({
        [destination.droppableId]: items,
      });
    } else {
      const _source = [...this.state[source.droppableId]];
      _source.splice(source.index, 1);
      const _destination = [...this.state[destination.droppableId]];
      _destination.splice(
        destination.index,
        0,
        this.state[source.droppableId][source.index]
      );
      this.setState({
        [source.droppableId]: _source,
        [destination.droppableId]: _destination,
      });
    }
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Box
          p="1rem"
          d="flex"
          height="100vh"
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
            />
          ))}
        </Box>
      </DragDropContext>
    );
  }
}

export default Board;
