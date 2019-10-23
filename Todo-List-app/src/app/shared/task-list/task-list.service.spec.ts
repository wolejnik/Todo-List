/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TaskListService } from './task-list.service';

describe('Service: TaskList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskListService]
    });
  });

  it('should ...', inject([TaskListService], (service: TaskListService) => {
    expect(service).toBeTruthy();
  }));
});
