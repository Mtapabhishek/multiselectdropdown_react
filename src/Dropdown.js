import React, { Component } from "react";

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.eachCheckBoxLi = this.eachCheckBoxLi.bind(this);
        this.state = {
            items: props.items,
            selectedItems: [],
            isOpen: false,
            selectAllListItem: {
                name: 'Select All Office',
                id: -1,
                value: 'select all office',
                selected: false
            }
        }

        this.onSingleSelectListItem = this.onSingleSelectListItem.bind(this);
        this.onMultiSelectListItem = this.onMultiSelectListItem.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.showSelectedItemString = this.showSelectedItemString.bind(this);
        this.onSelectAll = this.onSelectAll.bind(this);
        this.renderMuliSelect = this.renderMuliSelect.bind(this);
    }
    

    eachCheckBoxLi(item, index) {
        return (
            <li key={index} id={'item-' + item.id} className="list-item" >
                <input className="styled-checkbox" onChange={this.onMultiSelectListItem.bind(this, item)} type="checkbox" id={'t-' + item.id} checked={item.selected} />
                <label id="lbl" htmlFor={'t-' + item.id} >
                {item.name}
                </label>
            </li>
        )
    }
    toggleDropdown(e) {
        if (e) {
            e.stopPropagation();
        }
        this.setState((prevState) => ({
            isOpen: !prevState.isOpen
        }))
    }
    onMultiSelectListItem(item, e) {
        this.setState(prev => ({
            items: prev.items.map(prevItem => prevItem.id === item.id ? { ...prevItem , selected: !prevItem.selected } : prevItem)
        }), () => {
            const mySelectedItems = this.state.items.filter(i => i.selected);
            this.setState({
                selectedItems: mySelectedItems
            })
        })
        this.setState(prevState => ({
            selectAllListItem: { ...prevState.selectAllListItem, selected: false }
        }))
    }
    onSingleSelectListItem(item, e) {
        this.setState(prevState => ({
            items: prevState.items.map(i => {
                if (i.id === item.id) {
                    i.selected = true;
                } else {
                    i.selected = false;
                }
                return i;
            })
        }))
    }
    onSelectAll(e) {
        const isChecked = e.target.checked;
        this.setState((prevState) => {
            return {
                items: prevState.items.map(item => {
                    item.selected = isChecked;
                    return item;
                })
            }
        }, () => {
            const mySelectedItems = this.state.items.filter(i => i.selected);
            this.setState({
                selectedItems: mySelectedItems
            })
        })
        this.setState(prevState => ({
            selectAllListItem: { ...prevState.selectAllListItem , selected: !prevState.selectAllListItem.selected }
        }))
        
    }
    showSelectedItemString() {
        var str = '';
        if (this.state.selectedItems.length) {
            if (this.state.selectedItems.length === 1) {
                str += this.state.selectedItems[0].name;
            } else {
                const len = this.state.selectedItems.length;
                this.state.selectedItems.forEach((item, index) => {
                    if (index === len-1) {
                        str += item.name;
                    } else {
                        str += item.name + ', ';
                    }
                });
            }
        }
        return str || this.props.placeholder;
    }
    renderMuliSelect() {
        return (
            <ul className="mainUl">
                {
                    <li className="select-all list-item" >
                        <input onChange={this.onSelectAll} type="checkbox" className="styled-checkbox" id={'select-all'} checked={this.state.selectAllListItem.selected} />
                        <label  htmlFor={'select-all'}>
                            {this.state.selectAllListItem.selected ? 'Unselect All Office' :
                                this.state.selectAllListItem.name}
                        </label>
                    </li>}
                    {this.state.items.map(this.eachCheckBoxLi)}
            </ul>
        )
    }
    renderDisplay() {
       
            return this.renderMuliSelect()
      
    }
    render() {
        return (
            <div className="dropdowncomponent" >
                <div className="heading ellipse" onClick={this.toggleDropdown}>{this.showSelectedItemString()}</div>
                {this.state.isOpen && this.renderDisplay()}
            </div>
        )
    }
}

export default Dropdown;