import React, { Component } from "react";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      allSelected: false,  //for orange tick on allselected 
      allUnselected: false,  //for orange tick on unselected 
      isOpen: false,
      showAllSelected: true,  //to toggle between all selected list and allunselected list 
    };
    this.dropdownNode = React.createRef();
  }
  
  componentWillMount() {
    document.addEventListener("mousedown", this.handleClickOutside);

  }
componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
    
  }

  handleClickOutside=(evt) =>{     
    const dropdowncontainer = this.dropdownNode.current;
    if (!dropdowncontainer) {
      return;
    }
    const { target } = evt;
    if (target !== dropdowncontainer && !dropdowncontainer.contains(target)) {
      this.setState({
        isOpen: false,
      });
    }
  }

  // show the dropdown list or not
  toggleDropdown = (e) => {
    this.setState({ isOpen: !this.state.isOpen }); 
  };

  //update the selected item to state
  onMultiSelectListItem = (selectedItem) => {
    selectedItem.selected = !selectedItem.selected;
    let count = 0;
    const updatedItem = [];
    this.state.data.map((item) => {   
      if (item.selected) count++;
      updatedItem.push(item.id == selectedItem.id ? selectedItem : item);
    });
    if (count == this.state.data.length) {
      this.setState({
        data: updatedItem,
        allSelected: true,
        showAllSelected: false,
      });
    } else if (count == 0 && !selectedItem.selected) {
      this.setState({ data: updatedItem, allUnselected: true });
    } else {
      this.setState({
        data: updatedItem,
        allUnselected: false,
        allSelected: false,
        showAllSelected: true,
        
      });
    }
  };

  //update the selcted item to state when all items are selected
  onSelectAll = () => {
    const updatedItem = [];
    this.state.data.map((data1) => {
      data1.selected = true;
      updatedItem.push(data1);
      
    });
    this.setState({
      data: updatedItem,
      allSelected: true,
      showAllSelected: false,
      allUnselected: false,
    });
  };

  //update the selcted item to state when all items are unselcted
  onUnselectAll = () => {
    const updatedItem = [];
    this.state.data.map((data1) => {
      data1.selected = false;
      updatedItem.push(data1);
    });
    this.setState({
      data: updatedItem,
      allUnselected: true,
      showAllSelected: true,
      allSelected: false,
    });
  };

  // evaluate selected options
  showSelectedItemString = () => {
    let str = "";
    this.state.data.map((item) => {
      if (item.selected) {
        str += item.name +",";
      }
    });

    return str || "Options";
  };

  //returns JSX for each list item
  eachCheckBoxLi = (item, index) => {
    return (
      <li key={index} id={"item-" + item.id} className="list-item">
        <input
          className="styled-checkbox"
          onChange={() => this.onMultiSelectListItem(item)}
          type="checkbox"
          id={"t-" + item.id}
          checked={item.selected}
        />
        <label id="lbl" htmlFor={"t-" + item.id}>
          {item.name}
        </label>
      </li>
    );
  };

  //   returns JSX list items main render
  renderMuliSelect = () => {
    return (
      <ul className="mainUl">
        {this.state.showAllSelected ? (
          <li className="select-all list-item">
            <input
              onChange={() => this.onSelectAll()}
              type="checkbox"
              className="styled-checkbox"
              id={"select-all"}
              checked={this.state.allSelected}
              
            />
            <label htmlFor={"select-all"}>{"Select All"} </label>
          </li>
        ) : (
          <li className="select-all list-item">
            <input
              onChange={() => this.onUnselectAll()}
              type="checkbox"
              className="styled-checkbox"
              id={"unselect-all"}
              checked={this.state.allUnselected}
            />
            <label htmlFor={"unselect-all"}>{"Unselect All Office"}</label>
          </li>
        )}
        {/* dynamic list from props value */}
        {this.state.data.map((data, index) => this.eachCheckBoxLi(data, index))}
      </ul>
    );
  };

  render = () => {
    console.log("render");
    return (
      <div className="dropdowncomponent" ref={this.dropdownNode}>
        <div className="heading ellipse" onClick={this.toggleDropdown}>
          {this.showSelectedItemString()}
        </div>
        {this.state.isOpen && this.renderMuliSelect()}
      </div>
    );
  };
}

export default Dropdown;
