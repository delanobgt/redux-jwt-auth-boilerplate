import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import StarBorder from '@material-ui/icons/StarBorder'
import CleanLink  from '../misc/CleanLink'
import * as navActions from '../../actions/nav'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
})

class NestedList extends React.Component {
  state = {
    uploadOpen: false,
    viewOpen: false,
  }

  handleClick = () => {
    this.setState(state => ({ viewOpen: !state.viewOpen }))
  }

  closeDrawer = () => {
    this.props.toggleDrawerOpen(false)
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <List
          component="nav"
          subheader={
            <CleanLink to='/' onClick={this.closeDrawer}>
              <ListSubheader component="div">HRIS | UPH Medan</ListSubheader>
            </CleanLink>
          }
        >
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText inset primary="View" />
            {this.state.viewOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.viewOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <CleanLink to='/employees' onClick={this.closeDrawer}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText inset primary="Employees" />
                </ListItem>
              </CleanLink>
              <CleanLink to='/pph' onClick={this.closeDrawer}>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText inset primary="PPH Report" />
                </ListItem>
              </CleanLink>
            </List>
          </Collapse>

          <CleanLink to='/configurations' onClick={this.closeDrawer}>
            <ListItem button>
              <ListItemText inset primary="Configurations" />
            </ListItem>
          </CleanLink>

          <CleanLink to='/signout' onClick={this.closeDrawer}>
            <ListItem button>
              <ListItemText inset primary="Logout" />
            </ListItem>
          </CleanLink>
        </List>
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  connect(null, navActions)
)(NestedList)
