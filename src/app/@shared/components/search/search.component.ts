import { Component, OnInit, ElementRef, ViewChild, Input, Self, Optional, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, ValidatorFn, Validators, NgControl } from '@angular/forms';
import { debounce } from 'lodash';
import { SearchService } from '@shared/services/search.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements ControlValueAccessor, Validators, OnInit {
  @ViewChild('input', { static: false }) input: ElementRef;

  disabled: Boolean = false;
  private debouncedFunction: any = null;

  @Input() isLoading: boolean = false; // if isloading is true component will show loader on searching
  @Input() placeholder: string;
  @Input() label: string;
  @Input() showClear: boolean = false;

  // callback functions on search
  @Output() onSearch = new EventEmitter<string>();
  @Output() onClear = new EventEmitter<string>();

  constructor(@Optional() @Self() public controlDir: NgControl, private searchService: SearchService) {
    if (controlDir) {
      controlDir.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    if (this.controlDir) {
      const control = this.controlDir.control;
      const validators: ValidatorFn[] = control.validator ? [control.validator] : [];

      control.setValidators(validators);
      control.updateValueAndValidity();
      this.searchService.placeholderEventSource.subscribe((data) => {
        this.input.nativeElement.value = '';
        this.input.nativeElement.attributes[3].value = data;
      });
    }
  }

  writeValue(obj: any): void {
    // this.input.nativeElement.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  onChange(event: any) {
    // this.input.nativeElement.value
  }

  onTouched() {}

  search(event: any) {
    if (this.debouncedFunction) {
      this.debouncedFunction.cancel();
    }
    this.debouncedFunction = debounce(() => {
      this.searchService.searchEventSource.next(event); // pass text to parent coponent
    }, 1000);

    this.debouncedFunction();
  }
  clear(event: any) {
    if (this.debouncedFunction) {
      this.debouncedFunction.cancel();
    }
    this.debouncedFunction = debounce(() => {
      this.onClear.emit(event); // pass text to parent coponent
    }, 1000);

    this.debouncedFunction();
  }
}
