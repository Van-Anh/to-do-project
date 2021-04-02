import React, { Component } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Editable,
  EditableInput,
  EditablePreview,
  Textarea,
  Box,
  Text,
  Button,
  Select,
} from '@chakra-ui/react';
import { ITEM_PRIORITIES, LIST_ITEM_PRIORITIES } from '../constants';

export default class ItemDetailModal extends Component {
  state = {
    title: 'Title',
    description: '',
    priority: ITEM_PRIORITIES.MEDIUM.value,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.item != this.props.item) {
      const { item } = this.props;
      if (item) {
        this.setState({
          title: item?.title || '',
          description: item?.description || '',
        });
      } else {
        this.setState({
          title: 'Title',
          description: '',
        });
      }
    }
  }

  onChangeTitle = (value) => {
    this.setState({ title: value });
  };

  onChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  };

  onChangePriority = (e) => {
    this.setState({ priority: e.target.value });
  };

  onUpdate = () => {
    const { item, onUpdateItem, onClose } = this.props;
    const { title, description, priority } = this.state;
    const newItems = {
      ...item,
      title,
      description,
      priority,
    };
    onUpdateItem(newItems);
    onClose();
  };

  render() {
    const { item, onClose } = this.props;
    const { title, description, priority } = this.state;
    return (
      <Modal isOpen={Boolean(item)} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Editable value={title} onChange={this.onChangeTitle} w="90%">
              <EditablePreview />
              <EditableInput
                bg="white"
                boxShadow="0 1px 0 rgb(9 30 66 / 25%)"
                variant="filled"
              />
            </Editable>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text mb="0.5rem">Description</Text>
              <Textarea
                placeholder="Enter the description"
                defaultValue={description}
                onChange={this.onChangeDescription}
                w="100%"
                size="xs"
                fontSize="16px"
                variant="filled"
              />
            </Box>
            <Box>
              <Text mt="1rem" mb="0.5rem">
                Priority
              </Text>
              <Select
                placeholder="Select option"
                value={priority}
                onChange={this.onChangePriority}
              >
                {Object.keys(ITEM_PRIORITIES).map((_key) => (
                  <option
                    style={{ color: ITEM_PRIORITIES[_key].color }}
                    value={ITEM_PRIORITIES[_key].value}
                    key={ITEM_PRIORITIES[_key].value}
                  >
                    {ITEM_PRIORITIES[_key].text}
                  </option>
                ))}
              </Select>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
            <Button
              ml="1rem"
              colorScheme="blue"
              onClick={this.onUpdate}
              disabled={!title || !priority}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
}
