export interface ISideMenuConfig extends ng.ui.IState {
    menuHeaderBarClass?: string;
    menuHeaderBarTitle?: string;
    navBarClass?: string;
    menuTriggerButtonClass?: string;
}
    
export interface ISideMenu {
    __menuStateName?: string;
}

export abstract class SideMenuBase implements ISideMenu {
    public __menuStateName: string;
}