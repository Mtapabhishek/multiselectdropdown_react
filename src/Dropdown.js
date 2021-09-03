import React, { Component } from "react";

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.eachCheckBoxLi = this.eachCheckBoxLi.bind(this);
        this.state = {
            items: props.items,
            selectedItems: [],
            isOpen: false,

            selectAllListItem: this.props
        }

        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.dropdownNode = React.createRef();
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.items === nextProps.items) {
            return true;
        } else {
            return false;
        }
    }

    componentWillMount() {

        document.addEventListener('mousedown', this.handleClickOutside)
    }






    handleClickOutside(evt) {
        console.log(this.dropdownNode);
        const dropdowncontainer = this.dropdownNode.current;
        if (!dropdowncontainer) {
            return;
        }
        const { target } = evt;
        if (target !== dropdowncontainer && !dropdowncontainer.contains(target)) {
            this.setState({
                isOpen: false
            });
        }
    }

    eachCheckBoxLi(item, index) {
        return (
            <li id={'item-' + item.id} className="list-item" >
                <input className="styled-checkbox" onChange={this.onMultiSelectListItem.bind(this, item)} type="checkbox" id={'t-' + item.id} checked={item.selected} />
                <label id="lbl" htmlFor={'t-' + item.id} >
                    {item.name}
                </label>
            </li>
        )
    }
    toggleDropdown = (e) => {
        this.setState({ isOpen: !this.state.isOpen })
    }
    onMultiSelectListItem = (item, e) => {

        this.setState(prev => ({
            items: prev.items.map(prevItem => prevItem.id === item.id ? { ...prevItem, selected: !prevItem.selected } : prevItem)
        }), () => {
            const mySelectedItems = this.state.items.filter(i => i.selected);
            this.setState({
                selectedItems: mySelectedItems
            }, () => {
                if (this.state.selectedItems.length === this.state.items.length) {
                    this.onSelectAll()
                }
            })

        })

    }

    onSelectAll = (e, allselected) => {
        const isChecked = (e && e.target && e.target.checked) || allselected;
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
            }, () => {
                this.setState(prevState => ({
                    selectAllListItem: { ...prevState.selectAllListItem, selected: !prevState.selectAllListItem.selected }
                }))
            })
        })


    }
    showSelectedItemString = () => {
        var str = '';
        if (this.state.selectedItems.length) {
            if (this.state.selectedItems.length === 1) {
                str += this.state.selectedItems[0].name;
            } else {
                const len = this.state.selectedItems.length;
                this.state.selectedItems.forEach((item, index) => {
                    if (index === len - 1) {
                        str += item.name;
                    } else {
                        str += item.name + ', ';
                    }
                });
            }
        }
        return str || `Options ${this.props.placeholder}`;
    }
    renderMuliSelect = () => {
        return (
            <ul className="mainUl">
                {
                    <li className="select-all list-item" >
                        <input onChange={this.onSelectAll} type="checkbox" className="styled-checkbox" id={'select-all'} checked={this.state.selectAllListItem.selected} />
                        <label htmlFor={'select-all'}>
                            {this.state.selectAllListItem.selected ? 'Unselect All Office' :
                                this.state.selectAllListItem.name}
                        </label>
                    </li>}
                {this.state.items.map(this.eachCheckBoxLi)}
            </ul>
        )
    }

    render = () => {
        console.log("render")
        return (
            <div className="dropdowncomponent" ref={this.dropdownNode} >
                <div className="heading ellipse" onClick={this.toggleDropdown}>{this.showSelectedItemString()}</div>
                {this.state.isOpen && this.renderMuliSelect()}
            </div>
        )

    }

}

export default Dropdown;
