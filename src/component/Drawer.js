/**
* @providesModule component/Drawer
*/

import React, { Component } from 'react';
import { Drawer } from 'native-base';

class DrawerMenu extends Component {
    constructor() {
        super();
        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
    }
    closeDrawer() {
        this.drawer._root.close()
    };
    openDrawer() {
        this.drawer._root.open()
    };
    render() {
        return (
            <Drawer 
                ref={(ref) => { this.drawer = ref; }}
                onClose={() => this.closeDrawer}
            >
                {React.cloneElement(this.props.children, { openDrawer: this.openDrawer, closeDrawer: this.closeDrawer })}
            </Drawer>
        );
    }
}

export default DrawerMenu;