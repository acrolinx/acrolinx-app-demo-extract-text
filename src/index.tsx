/*
 * Copyright 2019-present Acrolinx GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, softwareq
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {initApi, ApiEvents} from '@acrolinx/app-sdk';
import './index.css';

// Initialize the Acrolinx App API.
const api = initApi({
  title: 'Extract Text',
  button: {
    text: 'Extract Text',
    tooltip: 'Extract text from the document'
  },
  requiredEvents: [ApiEvents.textExtracted],
  requiredCommands: []
});

// Listen to the textExtracted event.
api.events.textExtracted.addEventListener(textExtractedEvent => {
  document.getElementById('languageId')!.innerText = textExtractedEvent.languageId;
  document.getElementById('extractedText')!.innerText = textExtractedEvent.text;
  document.getElementById('wordCount')!.innerText = countWords(textExtractedEvent.text).toString();
});

// Do some "processing" on the extracted text.
function countWords(text: string) {
  const wordMatches = text.match(/\S+/g); // These are not really "words".
  if (!wordMatches) {
    return 0;
  }
  return wordMatches.length;
}
