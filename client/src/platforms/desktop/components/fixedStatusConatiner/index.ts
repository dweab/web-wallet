/** this class takes care about status messages which are sticky and appearance and disappearance is dependent on the state**/
import {connect} from "react-redux";
import {DesktopAppState} from "platforms/desktop/reducers";
import {selectDesktopSyncState} from "platforms/desktop/reducers/chain";
import {isWalletConnectedToDaemoon} from "platforms/desktop/reducers/walletRPC";
import {Component} from 'react';
import {addNotificationByKey, removeNotification} from "shared/actions/notification";
import {uuidv4} from "utility/utility";
import {
    IS_SYNCING_MESSAGE,
    SYNCING_SUCCEED_MESSAGE,
    WALLET_CONNECT_SUCCEED,
    WALLET_IS_CONNECTING
} from "constants/notificationList";
import {NotificationDuration} from "shared/reducers/notification";


interface FixedStatusProps {
    isSyncing: boolean;
    isWalletConnected: boolean;
}


class FixedStatusContainer extends Component<FixedStatusProps,any> {


    private syncingMessageID:string | null = null;
    private tryingConnectMessageID: string | null = null;




    componentDidUpdate(prevProps: Readonly<FixedStatusProps>, prevState: Readonly<any>, snapshot?: any): void {

        this.checkAndHandleSyncState(prevProps.isSyncing, this.props.isSyncing);
        this.checkAndHandleConnectionState(prevProps.isWalletConnected, this.props.isWalletConnected);



    }


    checkAndHandleSyncState(didSyncBefore : boolean, isSyncingNow: boolean) {

        // show a sync message
        if (!didSyncBefore && isSyncingNow && !this.syncingMessageID) {
            const id  = uuidv4();
            addNotificationByKey(IS_SYNCING_MESSAGE, NotificationDuration.STICKY, id);
            this.syncingMessageID = id;
        }

        // if sync succeed, remove fixed message and show success message
        if (didSyncBefore && !isSyncingNow && this.syncingMessageID) {

            removeNotification(this.syncingMessageID);
            this.syncingMessageID = null;
            addNotificationByKey(SYNCING_SUCCEED_MESSAGE);
        }

    }

    checkAndHandleConnectionState(didWalletConnectBefore: boolean, isWalletConnectedNow: boolean ) {


        // show a trying to connect message
        if (!isWalletConnectedNow && didWalletConnectBefore && !this.tryingConnectMessageID) {
            const id  = uuidv4();
            addNotificationByKey(WALLET_IS_CONNECTING, NotificationDuration.STICKY, id);
            this.tryingConnectMessageID = id;
        }

        // if connection succeed, remove fixed message and show success message
        if (!didWalletConnectBefore && isWalletConnectedNow && this.tryingConnectMessageID) {

            removeNotification(this.tryingConnectMessageID);
            this.tryingConnectMessageID = null;
            addNotificationByKey(WALLET_CONNECT_SUCCEED);
        }


    }


    render() {
        return null;
    }




}

const mapStateToProps = (state: DesktopAppState) => ({
    isSyncing: selectDesktopSyncState(state).isSyncing,
    isWalletConnected: isWalletConnectedToDaemoon(state.walletRPC)
});



export const FixedStatus = connect(mapStateToProps , {addNotificationByKey, removeNotification})(FixedStatusContainer)
