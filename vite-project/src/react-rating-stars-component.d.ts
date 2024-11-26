declare module 'react-rating-stars-component' {
    import { Component } from 'react';
  
    interface ReactStarsProps {
      count: number;
      value: number;
      size: number;
      activeColor: string;
      edit?: boolean;
      onChange?: (newRating: number) => void;
    }
  
    export default class ReactStars extends Component<ReactStarsProps> {}
  }
  