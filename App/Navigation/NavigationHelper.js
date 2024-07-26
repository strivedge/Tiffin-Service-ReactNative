import {NavigationContainerRef} from '@react-navigation/native';

let navigationRef = null;

export function setNavigationRef(ref) {
  navigationRef = ref;
}

export function navigate(routeName, params) {
  navigationRef?.navigate(routeName, params);
}
